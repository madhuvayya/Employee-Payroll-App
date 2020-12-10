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

    get department() { return this.department }
    set department(department) {
        this._department = department;
    } 

    get salary() { return this.salary }
    set salary(salary) {
        this._salary = salary;
    } 

    get note() { return this.note } 
    set note(note) {
        this._note = note;
    }

    get startDate() { return this.startDate }
    set startDate(startDate) {
        this._startDate = startDate;
    } 

    toString() {
        const options = { year: 'numeric', month:'log', day:'numeric' }
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US",options);
        return "id" + this.id + ", name='"+ this.name +", gender='"+ this.gender + 
                ", profilePic='"+ this.profilePic + ", department="+ this.department + 
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

});