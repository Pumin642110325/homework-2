// var student = {};
// student.name = 'คุณลุง';
// student.username = 'a@b.com';
// student.gender = 'ชาย';
// // console.log(student.name)
// // document.getElementById('output').innerText = student;

// var secondStudent = {};
// secondStudent.name = 'คุณนาย';
// secondStudent.username = 'c@f.com';
// secondStudent.gender = 'หญิง';

// var students = [
//     student,secondStudent,{
//         name :'สมรักษ์',
//         username : 'm@n.com',
//         gender : 'ชาย',
//     }
// ]

// function addStudent(student){
//     const output = document.getElementById('output');
//     addStudentData(output,'ชื่อ',student.name);
//     addStudentData(output,'รหัส',student.username);
//     addStudentData(output,'เพศ',student.gender);

//     addStudentData(output,'ชื่อ',secondStudent.name);
//     addStudentData(output,'รหัส',secondStudent.username);
//     addStudentData(output,'เพศ',secondStudent.gender);
    
//     addStudentData(output,'ชื่อ',students[2].name);
//     addStudentData(output,'รหัส',students[2].username);
//     addStudentData(output,'เพศ',students[2].gender);
// }
// function addStudentData(type,key,data){
//     let row = document.createElement('div');
//     row.classList.add('row');
//     let columnName = document.createElement('div')
//     columnName.classList.add('col-1')
//     columnName.classList.add('offset-1')
//     columnName.innerHTML=key
//     let columnValue = document.createElement('div')
//     columnValue.classList.add('col')
//     columnValue.innerHTML = data
//     row.appendChild(columnName)
//     row.appendChild(columnValue)
//     type.appendChild(row)
// }

// window.addEventListener('load',function(){
//     addStudent(student)
// })

function addStudentToTable(index,student){
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.name
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.username
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gender
    row.appendChild(cell)
    tableBody.appendChild(row)
}
// window.addEventListener('load',function(){
//     addStudentToTable(1,student)
// })

function addStudentList(StudentList){
    let counter =1;
    for( student of StudentList){
        addStudentToTable(counter++,student)
    }
}

// window.addEventListener('load',function(){
//     addStudentList(students)
// })


function addStudentToTable2(index,student){
    const tableBody2 = document.getElementById('tableBody2')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope', 'row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.name
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.surname
    row.appendChild(cell)
    cell = document.createElement('td')
    let somediv = document.createElement('div')
    cell.appendChild(somediv)
    let img = document.createElement('img')
    somediv.appendChild(img)
    img.setAttribute('src',student.image)
    img.style.width = '150px';
    row.appendChild(cell)
    //button delete
    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type','button')
    button.innerText = 'delete'
    button.addEventListener('click', function(){
        let confirm_delete = confirm(`ท่านต้องการลบคุณ${student.name}หรือไม่`)
        if (confirm_delete){
            deleteStudent(student.id)
        }
    })
    
    cell.appendChild(button)

    // row.addEventListener('click' , function(){
    //     showStudentBlock(student);
    // })
    row.appendChild(cell)
    tableBody2.appendChild(row)
}

function addStudentList2(StudentList){
    const tableBody = document.getElementById('tableBody2')
    tableBody.innerHTML =''
    let counter =1;
    for( student of StudentList){
        addStudentToTable2(counter++,student)
    }
}

// function onload(){
//     let students
//     fetch('asset/students.json').then(response =>{
//         return response.json()
//     })
//     fetch('asset/students2.json').then(response =>{
//         return response.json()
//     })
//         .then(data => {
//             let students = data
//             addStudentList(data)
//             addStudentList2(data)
//         })
// }

document.getElementById('searchButton').addEventListener('click',()=>{
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then(response => {
        return response.json()
    }).then(student => {
        addStudentData(student)
    })
})

function addStudentData(student){
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)
    profileElem.style.width='50em'
}

function onload(){
    hideAll()
    // fetch('https://dv-student-backend-2019.appspot.com/students')
    // .then((response) => {
    //     return response.json()
    // }).then(data => {
    //     addStudentList2(data)
    // })
    // // student = {
    // //     "studentId":"642110329",
    // //     "name":"Satang",
    // //     "surname":"Budsai",
    // //     "gpa":3.50,
    // //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg"
    // // }
    // // addStudentToDB(student)

    // // deleteStudent(16);
}

function addStudentToDB (student){
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(student)
    }).then(response => {
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }

    }).then(data=>{
        console.log('success',data)
        showStudentBlock(data);
    })
}

function deleteStudent(id){
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`,{
        method : 'DELETE'
    }).then(response => {
        if (response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data=>{
        alert(`student name ${data.name} is now deleted`)
        showAllStudent()
    }).catch(error => {
        alert(`your input student id is not on the database`)
    })
}

function onAddStudentClick(){
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student);
}

document.getElementById('addButton').addEventListener('click',onAddStudentClick);

function showAllStudent(){
    fetch('https://dv-student-backend-2019.appspot.com/students')
    .then((response)=>{
        return response.json()
    }).then(data => {
        addStudentList2(data)
    })
}

var singleStudentResult = document.getElementById('sinigle_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')

function hideAll(){
    singleStudentResult.style.display='none'
    listStudentResult.style.display='none'
    addUserDetail.style.display='none'
}

document.getElementById('allStudentMenu').addEventListener('click',(event)=>{
    showAllStudentBlock()
})

document.getElementById('addStudentMenu').addEventListener('click',(event)=>{
    hideAll();
    addUserDetail.style.display='block'
})

function showAllStudentBlock(){
    hideAll()
    listStudentResult.style.display='block'
    showAllStudent()
}

function showStudentBlock(student){
    singleStudentResult.style.display='block'
    addStudentData(student)
}