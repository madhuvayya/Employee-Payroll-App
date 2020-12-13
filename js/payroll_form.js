let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";  
        } catch (e) {
            textError.textContent = e;
        } 
    })

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    })

    const option = document.createElement("option");
    option.setAttribute("value", new Date().getFullYear());
    const node = document.createTextNode(new Date().getFullYear());
    option.appendChild(node);
    document.getElementById("year").appendChild(option);

    const selectedMonth = document.querySelector('#month');
    selectedMonth.addEventListener('change', (event) => {
        verifyDate();
    });

    const selectedDay = document.querySelector('#day');
    selectedDay.addEventListener('change', (event) => {
        verifyDate();
    });

    const verifyDate = () => {
        const dateError = document.querySelector('.date-error');
        const selectedDate = "'"+getInputValueById("#year")+"-"+ getInputValueById('#month')+"-"+getInputValueById('#day')+"'";       
        try {
            (new EmployeePayrollData()).startDate = new Date(selectedDate);
            dateError.textContent = "";  
        } catch (e) {
            dateError.textContent = e;
        }
    }

    checkForUpdate();
});

const save = () => {
    try {
        let empPayrollData = createEmployeePayroll();
        createAndUpdateStorage(empPayrollData);
    } catch (error) {
        return;
    }
}

const createEmployeePayroll = () => {
    let empPayrollData = new EmployeePayrollData();
    empPayrollData.id = getElementId();
    try {
        empPayrollData.name = getInputValueById('#name'); 
    } catch (error) {
        setTextValue('.text-error',error);
        throw error;
    }
    empPayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    empPayrollData.gender = getSelectedValues('[name=gender]').pop();
    empPayrollData.department = getSelectedValues('[name=department]');
    empPayrollData.salary = getInputValueById('#salary');
    empPayrollData.note = getInputValueById('#notes');
    let date = "'"+getInputValueById("#year")+"-"+ getInputValueById('#month') +"-"+getInputValueById('#day')+"'";
    try {
        empPayrollData.startDate = new Date(date);
    } catch (error) {
        setTextValue('.date-error',error);
    } 
    alert(empPayrollData.toString());
    return empPayrollData;    
}

const getElementId = () => {
    let empPayrollList = localStorage.getItem('EmployeePayrollList') ? 
                            JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    if (empPayrollList == 0) 
        return 1;
    for (let count = 2; ; count++) {
        if(!empPayrollList.find(empData => empData._id == count))
            return count;        
    }
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach( item => {
        if (item.checked) {
            selItems.push(item.value);
        }    
    });
    return selItems;  
}

const getInputValueById = (id) => {
    return document.querySelector(id).value;
}   

const getInputElementValue = ( ) => {
    return document.getElementById(id).value;
}

const createAndUpdateStorage = (empPayrollData) => {
    let empPayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (empPayrollList != undefined ) {
        empPayrollList.push(empPayrollData);
    } else {
        empPayrollList = [empPayrollData];
    }
    // alert(empPayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year',new Date().getFullYear());
    document.querySelector('.salary-output').textContent = '400000';
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach( item => {
        item.checked = false;
    });    
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () =>  {
    const empPayrollJson = localStorage.getItem('editEmp');
    isUpdate = empPayrollJson ? true : false;
    if (!isUpdate) return;
    empPayrollObj = JSON.parse(empPayrollJson);
    setForm();  
}

const setForm = () => {
    setValue('#name',empPayrollObj._name);
    setSelectedValues('[name=profile]', empPayrollObj._profilePic);
    setSelectedValues('[name=gender]', empPayrollObj._gender);
    setSelectedValues('[name=department]', empPayrollObj._department);
    setValue('#salary',empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#notes', empPayrollObj._note);
    let date = stringifyDate(empPayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach( item => {
        if(Array.isArray(value)) {
            if(value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value)
            item.checked = true;
    })
}