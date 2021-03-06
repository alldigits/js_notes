document.addEventListener("DOMContentLoaded", function() {

  // function updateNotes() {
  //   document.querySelector('#notes').innerText = notepad.showNotes()
  //    };
  var index = 0
  var tester = false
  const notepad = new NotePad();

  createEmoji = async (text, callback) => {
    let jsonText = JSON.stringify(`{ "text": "${text}" }`)
    await fetch("https://makers-emojify.herokuapp.com/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.parse(jsonText)
      })
    .then(response => response.json())
    .then(data => callback(data.emojified_text))
  }

  function displayAllNotes(){
    document.querySelector("ul").innerHTML = ""
    for(let i = 0; i < notepad.notes.length; i++){
      let abbText = notepad.notes[i].abbreviate()
      createEmoji(abbText, (abbText)=> {
      let li = document.createElement("li")
      li.setAttribute("id", `m${i}`)
      li.innerHTML = `<a href="#${i}">${abbText}</a>` 
      document.querySelector("#display").append(li)
      })
    }
  }

  

  document.querySelector("#submit-button").addEventListener('click', function(){
    let text = document.querySelector("#create-note").value
    

    if(text ===''){
      return
    }
    
    notepad.add(text)
    
    displayAllNotes()
    
    document.querySelector("#create-note").value = ''
    
  })

  document
    .querySelector("#display")
    .querySelectorAll("li")
    .addEventListener('click', urlChange())
    
    function urlChange() {
      window.addEventListener("hashchange", () => {
        displayAllNotes()
        let index_page = `#m${location.href.split("#")[1]}`

        document
        .querySelector(index_page)
        .innerHTML = notepad.notes[location.href.split("#")[1]].text;
    });
  };

    
})

