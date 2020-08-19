import {Injectable} from '@angular/core';
import speechList from '../../data/speechList';

export interface Speech {
  id: number;
  title: string;
  description: string;
  author: string;
  keywords: string[];
  speechDate: string;
  content: string;
}

/**
 * Note: Intentionally used async method signature to simulate API calls.
 */
@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  nextId: number;
  list: Speech[];

  constructor() {
    this.list = speechList as Speech[];
    this.nextId = this.list.length + 1;
  }

  async getList(): Promise<Speech[]> {
    return this.list.sort((a, b) => b.id - a.id) as Speech[];
  }

  async add(speech: Speech): Promise<Speech> {
    const newSpeech = {
      id: this.nextId,
      title: speech.title || '',
      author: speech.author || '',
      keywords: speech.keywords || [],
      speechDate: speech.speechDate || '',
      content: speech.content || ''
    } as Speech;

    this.nextId++;
    this.list.push(newSpeech);
    return newSpeech;
  }

  async update(speech: Speech): Promise<Speech> {
    const saved = this.list.find(s => s.id === speech.id);
    Object.assign(saved, speech);
    return speech;
  }

  async delete(speech: Speech): Promise<void> {
    this.list = this.list.filter(s => s.id !== speech.id);
  }

  async filter(keyword): Promise<Speech[]> {
    return this.list.filter(obj =>
      obj.title.indexOf(keyword) >= 0 ||
      obj.keywords.indexOf(keyword) >= 0 ||
      obj.author.indexOf(keyword) >= 0);
  }

  async generatePermalink(speech: Speech): Promise<string> {
    // dummy permalink
    return `https://fake.doma.in/${(Math.random() * 0xfffff * 1000000).toString(16)}`;
  }
}
