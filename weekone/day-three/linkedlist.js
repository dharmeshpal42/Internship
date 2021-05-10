class Node
{
    constructor(values,next = null)
    {
        this.values = values;
        this.next = next;
    }
}

class Linkedlist
{
    constructor()
    {
        this.head = null;
        this.size = 0;
    }

    // insert the values in node
    insertValues(values)
    {
        this.head = new Node(values,this.head);
        this.size++;
    }

    //insert the values at the last node

    insertAtLast(values)
    {
        let node = new Node(values);
        let curr;

        if(!this.head)
        {
            this.head = null;
        }
        else{
            curr = this.head;
            while(curr.next)
            {
                curr = curr.next;
            }
            curr.next = node;
        }
        this.size++;
    }

    //insert the node on specific values

    insertAtIndex(values,index)
    {
        if(index>0 && index>this.size)
        {
            return;
        }

        if(index === 0)
        {
            this.head = new Node(values ,this.head);
            return;
        }

        const node = new Node(values);
        let curr,prev;

        curr = this.head;
        let count = 0;
        while(count < index)
        {
            prev = curr;
            count++;
            curr = curr.next;
        }
        node.next = curr;
        prev.next = node;
        this.size++;
    }
    //get values at index

    getAtIndex(index)
    {
        let curr = this.head;
        let count = 0;
        
            while(curr)
            {
                if(count == index)
                {
                    console.log(curr.values);
                }
                count++;
                curr = curr.next;
            }
            return;
    }
    //remove the node on index

    removeAtIndex(index)
    {

        if(index>0 && index>this.size)
        {
            return;
        }
        
        let curr = this.head;
        let prev;
        let count = 0;
        if(index == 0)
        {
            this.head = curr.next;
        }
        else{
            while(count<index)
            {
                count++;
                prev = curr;
                curr = curr.next;
            }
            prev.next = curr.next;
        }
        this.size--;
    }
    //clear the all node in the list
    clearAll()
    {
        this.head = null ;
        this.size = 0;
    }

    //print the nodes 

    print()
    {
        let curr = this.head;
        while(curr)
        {
            console.log(curr.values);
            curr = curr.next;
        }
    }
}

const ll = new Linkedlist();
ll.insertValues(100);
ll.insertValues(200);
ll.insertValues(300);
ll.insertAtLast(400);
ll.insertAtIndex(500,2);
//ll.getAtIndex(2)
ll.removeAtIndex(2)
//ll.clearAll();
ll.print();
