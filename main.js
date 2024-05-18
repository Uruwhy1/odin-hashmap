class Hashmap {
  constructor(initialCapacity = 16) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    if (this.size >= this.buckets.length * 0.7) {
      this.grow();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];
      if (existingKey === key) {
        // Key exists, update the value
        bucket[i] = [key, value];
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;
  }

  grow() {
    console.log(this.buckets.length);

    const newBuckets = new Array(this.buckets.length * 2)
      .fill(null)
      .map(() => []);
    const oldBuckets = this.buckets;

    this.buckets = newBuckets;
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }

    console.log(this.buckets.length);
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (key == bucket[i][0]) {
        return bucket[i][1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (key === bucket[i][0]) {
          return true;
        }
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (key === bucket[i][0]) {
          // remove the entry
          bucket.splice(i, 1);
          return true;
        }
      }
    }

    return false;
  }

  length() {
    let count = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      let buckets = this.buckets;

      if (buckets[i]) {
        // OPTION 1: ADD BUCKETs[I].LENGTH TO COUNT
        count += buckets[i].length;

        // OPTION 2: ITERATE THROUGH BUCKETs[I] AND ADD EACH TIME WE VISIT A NODE.
        // for (each pair we loop inside of bucket[i]) {add one to count}
      }
    }

    return count;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      let buckets = this.buckets;

      if (buckets[i]) {
        buckets[i] = [];
      }
    }

    this.size = 0;
  }

  keys() {
    let keysArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];

      if (bucket && bucket.length > 0) {
        for (const pair of bucket) {
          keysArray.push(pair[0])
        }

      }
    }

    return keysArray;
  }

  values() {
    let valuesArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];

      if (bucket && bucket.length > 0) {
        for (const pair of bucket) {
          valuesArray.push(pair[1])
        }

      }
    }

    return valuesArray;
  }

  entries() {
    let entriesArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];

      if (bucket && bucket.length > 0) {
        for (const pair of bucket) {
          entriesArray.push([pair[0], pair[1]])
        }

      }
    }

    return entriesArray;
  }
  
}

class Hashset {
  constructor(initialCapacity = 16) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }

    return hashCode;
  }

  set(key) {
    if (this.size >= this.buckets.length * 0.7) {
      this.grow();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const existingKey = bucket[i];
      if (existingKey === key) {
        return;
      }
    }

    bucket.push(key);
    this.size++;
  }

  grow() {
    console.log(this.buckets.length);

    const newBuckets = new Array(this.buckets.length * 2)
      .fill(null)
      .map(() => []);
    const oldBuckets = this.buckets;

    this.buckets = newBuckets;
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const key of bucket) {
        this.set(key);
      }
    }
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (key === bucket[i]) {
          return true;
        }
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (key === bucket[i]) {
          bucket.splice(i, 1);
          return true;
        }
      }
    }

    return false;
  }

  length() {
    let count = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      let buckets = this.buckets;

      if (buckets[i]) {
        // OPTION 1: ADD BUCKETs[I].LENGTH TO COUNT
        count += buckets[i].length;
      }
    }

    return count;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }

    this.size = 0;
  }

  keys() {
    let keysArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];

      if (bucket && bucket.length > 0) {
        for (const pair of bucket) {
          keysArray.push(pair)
        }

      }
    }

    return keysArray;
  }
}


// TESTING

let test = new Hashset();

test.set("apple");
test.set("google");
test.set("microsoft");
test.set("openAI")



console.log(test.keys())
console.log(test.length());
console.log(test.remove('google'))
console.log(test.keys())
console.log(test.has('microsoft'))
console.log(test.clear())

console.log(test.keys())

