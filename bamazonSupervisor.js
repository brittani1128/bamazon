function getDepartments() {
    connection.query("SELECT department_name FROM products",function(err,res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            var department = res[i].department_name;
            departments.push(department);
        }
    });
};