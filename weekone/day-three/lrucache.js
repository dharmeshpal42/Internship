class node {
    constructor(key,value)
    {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class lru
{
    constructor()
    {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.maxsize = 4;
        this.cache = {};
    }

    put(key,value)
    {
        let newnode
        if(this.cache[key] === undefined) newnode = new node(key,value)

        if(this.size === 0)
        {
            this.head = newnode;
            this.tail = newnode;
            this.size++;
            this.cache[key] = newnode;
            return this;
        }

        if(this.size === this.maxsize)
        {
            delete this.cache[this.tail.key];

            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
        }

        this.head.prev = newnode;
        this.head.next = newnode;
        this.head = newnode;
        this.size++;
        this.cache[key] = newnode;
        return this;
    }
}

const c = new lru();
c.put(1,'a');
c.put(2,'b');
c.put(3,'c');
c.put(4,'d');
c.put(5,'e');
console.log(c.size);

