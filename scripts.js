function main(){

    const theMartian = new Book('The Martian', 'Andy Weir', 369, 'read')
    const sapiens = new Book('Sapiens', 'Yuval Noah Harai', 443, 'read')
    const artemis = new Book('Artemis', 'Andy Weir', 309, 'read')

    let myLibrary = [theMartian, sapiens, artemis]

    createTable(myLibrary)
    addBook(myLibrary)    
}

function Book (title, author, pages, read){
    
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = 'Unread';

}

Book.prototype.readStatus = function(){
    console.log(this.read)
    if (this.read.toLowerCase() === 'read'){
        this.read = 'Unread'
    }
    else{
        this.read = 'Read'
    }
    return this.read
}


function addBookToLibrary (library){

    title = prompt('Book Title')
    author = prompt('Book Author')
    pages = parseInt(prompt('How many pages?'))
    read = 'Unread'
    const newBook = new Book(title, author, pages, read)

    library.push(newBook)

}

function createTable (library){

    const tBody = document.querySelector('tbody')

    while(tBody.hasChildNodes()){
        tBody.removeChild(tBody.lastChild)
    }

    library.forEach((element, i) => {
        let tr = tBody.insertRow();
        for (const prop in element){
            if (prop === 'title' || prop === 'author' || prop === 'pages'){
                let td = tr.insertCell();
                td.appendChild(document.createTextNode(element[prop]))
            }
            else if (prop ==='read'){
                let td = tr.insertCell();
                let readBtn = document.createElement('button')
                readBtn.className = 'read'
                readBtn.type = 'button'
                readBtn.innerHTML = element.read
                td.appendChild(readBtn)
                readBtn.addEventListener('click', () => {
                    element.readStatus()
                    createTable(library)
                    console.log(element[prop])
                })
            }
            else{
                continue
            }
        }
        
        let td = tr.insertCell();
        let removeBtn = document.createElement('button')
        removeBtn.innerHTML = 'Remove'
        removeBtn.type = 'button'
        removeBtn.onclick = function (){
            library.splice(i, 1) 
            console.log(i)
            createTable(library)
        }
        td.appendChild(removeBtn)
    });
}

function addBook (library) {

    const newBook = document.getElementById('addBook')
    newBook.addEventListener('click', ()=>{
        addBookToLibrary(library)
        createTable(library)
    })
}

main()