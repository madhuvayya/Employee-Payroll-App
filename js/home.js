window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";

    let empPayrollData = createEmployeePayrollJSON()[0];                    
    const innerHtml = `${headerHtml} 
        <tr>
            <td>
                <img class="profile" alt="" src="${empPayrollData._profilePic}">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>
                <div class="dept-label">${empPayrollData._department[0]}</div>
                <div class="dept-label">${empPayrollData._department[1]}</div>
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img name="${empPayrollData._id}" title="Delete" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img name="${empPayrollData._id}" title="Update" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">                    
            </td>
        </tr>
    `;
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList) {
        deptHtml = `${deptHtml}<div class='dept-label'>${dept}</div>`
    }
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Narayan Mahadevan',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '50000',
            _startDate: '29 oct 2019',
            _note: '',
            _id: new Date().getDate,
            _profilePic: '../assets/profile-images/Ellipse -2.png'  
        },
        {
            _name: 'Anarpa Shashank Keerthi Kumar',
            _gender: 'female',
            _department: [
                'Sales'
            ],
            _salary: '40000',
            _startDate: '29 oct 2019',
            _note: '',
            _id: new Date().getTime()+1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'  
        }        
    ];
    return empPayrollListLocal;
}