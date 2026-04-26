// import pkg from 'pg';
import { nanoid } from 'nanoid';
import { Pool } from 'pg';

class NotesRepositories {
  constructor() {
    this.pool = new Pool();
  }

  _exec(client) {
    return client ?? this.pool;
  }

  async createNote({ title, body, tags, owner }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, title, tags, body, createdAt, updatedAt, owner],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getNotes(owner) {
    const result = await this.pool.query(
      'SELECT * FROM notes WHERE owner = $1',
      [owner],
    );
    return result.rows;
  }

  async getNoteById(id) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editNote({ id, title, body, tags }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE notes SET title = $1, tags = $2, body = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [title, tags, body, updatedAt, id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteNote(id) {
    const query = {
      text: 'DELETE FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async verifyNoteOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      return null;
    }
    const note = result.rows[0];
    if (note.owner !== owner) {
      return null;
    }
    return result.rows[0];
  }
}

export default new NotesRepositories();
