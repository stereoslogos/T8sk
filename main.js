class TaskManager{
    tasks = [];
    lastId = 0;
    tagTasks = null;
    tagText = null;
    _labelStorage = "tasks";

    constructor(tagTasks,tagText){
        this.tagTasks = tagTasks;
        this.tagText = tagText;

        if(localStorage.getItem(this._labelStorage) !== null){
            this.tasks = JSON.parse(localStorage.getItem(this._labelStorage));
            this.lastId = this.tasks.length > 0 ?
                        this.tasks[this.tasks.length-1].id : 0;
            this.refresh();
        }
    }

    add(){
        this.lastId++;
        this.tasks.push({
            id: this.lastId,
            text: this.tagText.value});
        localStorage.setItem(
            this._labelStorage,
            JSON.stringify(this.tasks));
            this.tagText.value = "";
            this.tagText.focus();
            this.refresh();
    }

    remove(id){
        this.tasks = this.tasks.filter(d => d.id !==id);
        localStorage.setItem(
            this._labelStorage,
            JSON.stringify(this.tasks));
        this.refresh();
    }

    refresh(){
        this.tagTasks.innerHTML = "";
        this.tasks.forEach(e=>{
            let div = document.createElement("div");
            let divRemove = document.createElement("div");
            let buttonRemove = document.createElement("input");
            
            div.innerHTML = e.text;

            divRemove.className = "btnDiv";
            
            buttonRemove.value = "X";
            buttonRemove.className = "btn-clean";
            buttonRemove.type = "button";
            buttonRemove.addEventListener("click",()=>{
                this.remove(e.id);
            });

            divRemove.appendChild(buttonRemove);
            div.appendChild(divRemove);

            this.tagTasks.appendChild(div);
        });
    }
}