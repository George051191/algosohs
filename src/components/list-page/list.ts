export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  getSize: () => number;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => LinkedListNode<T>[];
  deleteByIndex: (index: number) => void;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;
  values: T[];
  constructor(values?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.values = values!;
  }

  deleteHead() {
    if (!this.head) {
      return;
    }

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode!.next) {
      if (!currentNode!.next.next) {
        currentNode!.next = null;
      } else {
        currentNode = currentNode!.next;
      }
    }

    this.tail = currentNode;
    this.size--;
    //return deletedTail;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  ///добавляем по индексу
  addByIndex(element: T, index: number | string) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new LinkedListNode(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let pre = null;
        while (currIndex < index) {
          pre = curr;
          curr = curr!.next;
          currIndex++;
        }
        pre!.next = node;
        node.next = curr;
      }

      this.size++;
    }
  }
  /// удаляем по индексу

  deleteByIndex(index: number | string) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      if (index === 0) {
        this.head = this.head!.next;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let pre = null;
        while (currIndex < index) {
          pre = curr;
          curr = curr!.next;
          currIndex++;
        }

        pre!.next = curr!.next;
        if (curr === this.tail) {
          this.tail = null;
        }
        curr = null;
      }
      this.size--;
    }
  }

  ////в конец добавление
  append(element: T) {
    const node = new LinkedListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
    this.tail = node;
  }
  ///добавление в начало
  prepend(element: T) {
    const newNode = new LinkedListNode(element, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
