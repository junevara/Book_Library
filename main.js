function Book(title, author, pagesnum, read){
    this.title = title
    this.author = author
    this.pagesnum = pagesnum
    this.read = read
    this.info = function() {
        const info = title + " by " + author + ", " + pagesnum + " pages, " + read;
        return info; 
    }
    
}

const mylibrary = [];

let i = 0;
let a = '';
let b = ''; 
let c = 0;
let d = '';
let counter = 0;

function addBookToLibrary(title, author, pages, read) {
   
    
    
    mylibrary[i] = new Book(title, author, pages, read);
   

    
    i++;
}





function hideform(){
    const removeBookForm = document.getElementById("addBookForm");
    removeBookForm.remove();
    const bringback = document.createElement('form');
    document.querySelector('body').appendChild(bringback);

    bringback.setAttribute("id", "addBookForm");
    const showformbutton = document.getElementById("addBook");
    showformbutton.removeAttribute("disabled");
}

function removeBook(event){
    const index = event.target.getAttribute("data");
    
    const booktoremove = document.querySelector(`tr[data='${index}']`);
    const buttontoremove = document.querySelector(`button.rmbutton[data='${index}']`);
    booktoremove.remove();
    buttontoremove.remove();
    const catchprelength = mylibrary.length;
    mylibrary.splice(index, 1);
    if (index < (catchprelength-1)){
        
        for(let i = 0; i < mylibrary.length; i++){
            const arrayitem = document.querySelector(`tr:nth-child(${i+2})`);
            
            arrayitem.setAttribute('data', i);
            const rmbuttonchangedata = document.querySelector(`.rmbutton:nth-child(${i+1})`);
            
            rmbuttonchangedata.setAttribute('data', i);

            const switchbuttonchangedata = document.querySelector(`tr:nth-child(${i+2}) > td:nth-child(4) > button`);
            console.log(switchbuttonchangedata);
            switchbuttonchangedata.setAttribute('data', i);

        }   
    }
    console.log(mylibrary);
    counter--;
    i--;
}

const identifier = ["Title", "Author", "Pages"];

function showform() {
    const showformbutton = document.getElementById("addBook");
    showformbutton.setAttribute("disabled", "");
    for(let j=0; j < identifier.length; j++) {
        const input = document.createElement('input');
        input.setAttribute("type", "text");
        input.setAttribute("id", identifier[j]);
        input.setAttribute("name", identifier[j]);
        input.setAttribute("class", "input");
        const inputlabel = document.createElement('label');
        inputlabel.innerHTML = `${identifier[j]}: `;
        const container = document.createElement('div');
        
        inputlabel.setAttribute("for", identifier[j]);
        container.appendChild(inputlabel);
        container.appendChild(input);
        document.getElementById("addBookForm").appendChild(container);
    }

    

    const checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "Read?");
    checkbox.setAttribute("name", "Read?");
    checkbox.setAttribute("class", "input");
    const checkboxlabel = document.createElement("label");
    checkboxlabel.innerHTML = 'Read?';
    const checkboxcontainer = document.createElement('div');
    
    checkboxlabel.setAttribute("for", "Read?");
    checkboxcontainer.appendChild(checkboxlabel);
    checkboxcontainer.appendChild(checkbox);
    document.getElementById("addBookForm").appendChild(checkboxcontainer);


    
    const title = document.getElementById("Title");
    const author = document.getElementById("Author");
    const pages = document.getElementById("Pages");
    const read = document.getElementById("Read?");
    
    const inputs = document.querySelectorAll(".input");
    
    inputs.forEach(input => {
        input.addEventListener('change', (event) => {
            a = String(title.value);
            
            b = String(author.value);
           
            c = pages.value;
            
            d = read.checked ? 'read' : 'not read';
            
            
        });
    });
    

    
    
    const submitbutton = document.createElement('button');
    submitbutton.setAttribute("type", "submit");
    submitbutton.setAttribute("id", "submit");
    submitbutton.innerHTML = "Submit";
    document.getElementById("addBookForm").appendChild(submitbutton);

    const submitbutton2 = document.getElementById("submit");
    

    submitbutton2.addEventListener('click', (event) => {
        event.preventDefault();
        
        
        
        addBookToLibrary(a, b, c, d);
        displaylibrary();
        hideform();
        
        const rmbutton = document.querySelector(`button.rmbutton[data='${counter-1}']`);
        
        rmbutton.addEventListener('click', (event) => {
        
        removeBook(event);
        })
       
        const readtoggle = document.querySelector(`button.readswitch[data='${counter-1}']`);

        readtoggle.addEventListener('click', (event) => {
            
            const index = Number(event.target.getAttribute("data"));
            console.log(index);
            
            if (mylibrary[index].read === 'read'){
                mylibrary[index].read = 'not read';
                document.querySelector(`tr:nth-child(${index+2}) > td:nth-child(4) > div`).innerHTML = 'not read';
            }
            else {
                mylibrary[index].read = 'read';
                document.querySelector(`tr:nth-child(${index+2}) > td:nth-child(4) > div`).innerHTML = 'read';
            }
        })
    
    });
    

}

function displaylibrary() {
    
        
        const row = document.createElement('tr');
        row.setAttribute("data", counter);
        const data1 = document.createElement('td');
        data1.innerHTML = mylibrary[counter].title;
        row.appendChild(data1);
        const data2 = document.createElement('td');
        data2.innerHTML = mylibrary[counter].author;
        row.appendChild(data2);
        const data3 = document.createElement('td');
        data3.innerHTML = mylibrary[counter].pagesnum;
        row.appendChild(data3);
        const data4 = document.createElement('td');
        const divread = document.createElement('div');
        divread.innerHTML = mylibrary[counter].read;
        const readtoggle = document.createElement('button');
        readtoggle.innerHTML = "switch";
        readtoggle.setAttribute("data", counter);
        readtoggle.setAttribute("class", "readswitch");
        data4.appendChild(divread);
        data4.appendChild(readtoggle);
        
        row.appendChild(data4);
        
        document.getElementById("booksInfo").appendChild(row);
        
        
        const removebutton = document.createElement('button');
        removebutton.innerHTML = "remove";
        removebutton.setAttribute("data", counter);
        removebutton.setAttribute('class', 'rmbutton');
        document.getElementById("rmbuttoncontainer2").appendChild(removebutton);
        
        counter++;

        
    
    
}



const newBookButton = document.getElementById('addBook');
newBookButton.addEventListener('click', showform);








