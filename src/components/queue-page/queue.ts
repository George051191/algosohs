interface IQueue<T> {
  enqueue: (
    item: T,
    addCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>
  ) => void;
  dequeue: () => void;
  getHead: () => T | null;
  getTail: () => T | null;
  isEmpty: () => boolean;
  elements: () => Array<T | null>;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }
  enqueue = (
    item: T,
    addCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>
  ) => {
    if (this.length >= this.size - 1) {
      addCallback(true);
    }
    if (this.tail === this.size) {
      this.tail = 0;
    }
    this.container[this.tail] = item;
    this.length++;
    this.tail++;
  };
  dequeue = () => {
    if (this.isEmpty()) {
      console.log(";");
    }
    if (this.head === this.size) {
      this.head = 0;
    }
    this.container[this.head % this.size] = null;
    this.length--;
    this.head++;
  };
  getHead = (): T | null => {
    return this.container[this.head];
  };

  getTail = (): T | null => {
    return this.container[this.tail - 1];
  };

  elements = (): Array<T | null> => {
    return this.container;
  };

  isEmpty = () => this.length === 0;

  getLength = (): number => {
    return this.tail;
  };

  getHeadIndex = (): number => {
    return this.head;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };
}
