class EmployeePayrollData {

    get id() { return this._id }
    set id(id) {
        this._id = id;
    }

    get name() { return this._name }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else
            throw 'Name is incorrect!'    
    }

    get profilePic() { return this._profilePic }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() { return this._gender }
    set gender(gender) {
        this._gender = gender;
    }

    get department() { return this._department }
    set department(department) {
        this._department = department;
    } 

    get salary() { return this._salary }
    set salary(salary) {
        this._salary = salary;
    } 

    get note() { return this._note } 
    set note(note) {
        this._note = note;
    }

    get startDate() { return this._startDate }
    set startDate(startDate) {
        let time_difference = new Date().getTime() - startDate.getTime();
        var days_difference = time_difference / (1000 * 60 * 60 * 24);
        if(days_difference < 30 & days_difference >= 1) {
            this._startDate = startDate;
        } else if(days_difference < 0) {
            throw 'Start date should not be future date';        
        } else
            throw 'Start date must be with in 30 days';
    } 

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString('en-US',options);
        return "id=" + this.id + ", name="+ this.name +", gender="+ this.gender + 
                ", profilePic="+ this.profilePic + ", department="+ this.department + 
                ", salary=" + this.salary + ", startDate="+ empDate +", note="+ this.note; 
    }
}

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
    let date = "'"+getInputValueById("#year")+"-"+ getInputValueById('#month')+"-"+getInputValueById('#day')+"'";
    try {
        empPayrollData.startDate = new Date(date);
    } catch (error) {
        setTextValue('.date-error',error);
    } 
    alert(empPayrollData.toString());
    return empPayrollData;    
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



