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
        if (startDate > new Date()) {
            throw 'start Date is a future date!';
        }
        let now =new Date();
        var diff=Math.abs(now.getTime()-startDate.getTime());
        if(diff/(1000*60*60*24)>30)
            throw 'Start Date is beyond 30 days!';
        this._startDate=startDate+1;
    } 

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString('en-US',options);
        return "id=" + this.id + ", name="+ this.name +", gender="+ this.gender + 
                ", profilePic="+ this.profilePic + ", department="+ this.department + 
                ", salary=" + this.salary + ", startDate="+ empDate +", note="+ this.note; 
    }
}
  




