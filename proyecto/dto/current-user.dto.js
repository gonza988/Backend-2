export class currentUserDTO {
    constructor(user) {
        //EL DTO controla los datos que salen por la API y evita que se expongan datos sensibles como la contraseña;
        this.id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
    }
};