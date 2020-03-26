export interface User {
    username: string;
    password: string;
    nom?: string;
    prenom?: string;
    telephon?: string;
    dateNaissance?: string;
    role?: string;
    adresse?: string;
    token?: string;
    isActive?: boolean;
    email?: string;
    id?: number;
    roles?: string[];
}

