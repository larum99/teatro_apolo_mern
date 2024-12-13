'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        idDocument: "Cédula de Ciudadanía",
        idNumber: "",
        birthDate: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        idNumber: "",
        phoneNumber: "",
    });

    const [success, setSuccess] = useState("");
    const router = useRouter();

    const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleBlur = (e) => {
        const { id } = e.target;
        validateField(id); // Validar el campo cuando el usuario sale del campo
    };

    const validateField = (field) => {
        let newErrors = { ...errors };

        switch (field) {
            case "email":
                if (!formData.email) {
                    newErrors.email = "El campo Correo es obligatorio";
                } else {
                    newErrors.email = "";
                }
                break;
            case "password":
                if (!formData.password) {
                    newErrors.password = "El campo Contraseña es obligatorio";
                } else if (formData.password.length < 8 || !/[a-z]/.test(formData.password) || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[*$#-]/.test(formData.password)) {
                    newErrors.password = "La contraseña debe tener mínimo 8 caracteres y estar compuesta por lo menos de una minúscula, una mayúscula, un número y un carácter especial entre *, $, -, #.";
                } else {
                    newErrors.password = "";
                }
                break;
            case "confirmPassword":
                if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = "El campo Confirmar contraseña no coincide";
                } else {
                    newErrors.confirmPassword = "";
                }
                break;
            case "firstName":
                if (!formData.firstName) {
                    newErrors.firstName = "El campo Nombres es obligatorio";
                } else {
                    newErrors.firstName = "";
                }
                break;
            case "lastName":
                if (!formData.lastName) {
                    newErrors.lastName = "El campo Apellidos es obligatorio";
                } else {
                    newErrors.lastName = "";
                }
                break;
            case "idNumber":
                if (!formData.idNumber) {
                    newErrors.idNumber = "El campo Documento es obligatorio";
                } else {
                    newErrors.idNumber = "";
                }
                break;
            case "phoneNumber":
                if (!formData.phoneNumber) {
                    newErrors.phoneNumber = "El campo Número de celular es obligatorio";
                } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
                    newErrors.phoneNumber = "El número de celular debe contener 10 dígitos";
                } else {
                    newErrors.phoneNumber = "";
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        let newErrors = {};

        // Validación de campos obligatorios
        if (!formData.email) newErrors.email = "El campo Correo es obligatorio";
        if (!formData.firstName) newErrors.firstName = "El campo Nombres es obligatorio";
        if (!formData.lastName) newErrors.lastName = "El campo Apellidos es obligatorio";
        if (!formData.idNumber) newErrors.idNumber = "El campo Documento es obligatorio";
        if (!formData.phoneNumber) newErrors.phoneNumber = "El campo Número de celular es obligatorio";


        // Validación de la contraseña
        if (!formData.password) {
            newErrors.password = "El campo Contraseña es obligatorio";
        } else if (formData.password.length < 8 || !/[a-z]/.test(formData.password) || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[*$#-]/.test(formData.password)) {
            newErrors.password = "La contraseña debe tener mínimo 8 caracteres y estar compuesta por lo menos de una minúscula, una mayúscula, un número y un carácter especial entre *, $, -, #.";
        }

        // Validación de confirmación de contraseña
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "El campo Confirmar contraseña no coincide";
        }

        // Validación del teléfono
        if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "El número de celular debe contener 10 dígitos";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar antes de enviar
        if (!validateForm()) {
            return; // No enviar el formulario si hay errores
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, formData);

            setSuccess("Usuario registrado exitosamente. Redirigiendo a iniciar sesión...");
            setErrors({});
            setTimeout(() => router.push("/login"), 2000); // Redirigir tras 2 segundos
        } catch (err) {
            setErrors(err.response?.data?.message || "Ocurrió un error. Por favor, intenta nuevamente.");
            setSuccess("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 border border-primary rounded-md shadow-md bg-primary">
            <h2 className="text-2xl font-bold mb-6 text-center">Regístrate</h2>

            {success && <p className="text-green-500">{success}</p>}

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-secondary-dark">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}  // Validar cuando el usuario sale del campo
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
                {errors.email && <span className="help is-danger text-red-500">{errors.email}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-secondary-dark">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
                {errors.password && <span className="help is-danger text-red-500">{errors.password}</span>}

            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-dark">
                    Confirmar contraseña
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
                {errors.confirmPassword && <span className="help is-danger text-red-500">{errors.confirmPassword}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-secondary-dark">
                    Nombres
                </label>
                <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
                {errors.firstName && <span className="help is-danger text-red-500">{errors.firstName}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-secondary-dark">
                    Apellidos
                </label>
                <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
                {errors.lastName && <span className="help is-danger text-red-500">{errors.lastName}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="idDocument" className="block text-sm font-medium text-secondary-dark">
                    Tipo de documento
                </label>
                <select
                    id="idDocument"
                    value={formData.idDocument}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                >
                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="idNumber" className="block text-sm font-medium text-secondary-dark">
                    Número de documento
                </label>
                <input
                    type="text"
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
                {errors.idNumber && <span className="help is-danger text-red-500">{errors.idNumber}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="birthDate" className="block text-sm font-medium text-secondary-dark">
                    Fecha de nacimiento
                </label>
                <input
                    type="date"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-secondary-dark">
                    Número de celular
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary"
                    required
                />
                {errors.phoneNumber && <span className="help is-danger text-red-500">{errors.phoneNumber}</span>}
            </div>

            <div className="mb-4">
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-secondary-dark hover:bg-secondary text-white font-semibold rounded-md shadow-md hover:bg-primary-dark focus:outline-none"
                >
                    Registrarse
                </button>
            </div>
            <div className="text-center">
                <p className="text-sm">
                    ¿Ya tienes cuenta? <Link href="/login" className="text-secondary hover:underline">Inicia sesión</Link>
                </p>
            </div>
        </form>
    );
}
