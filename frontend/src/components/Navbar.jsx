'use client';

import { useAuth } from '../context/AuthContext';
import Link from "next/link";
import Image from "next/image";
import { ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout(); // Actualiza el estado global
    router.push('/');
  };

  return (
    <nav className="bg-primary p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Teatro Apolo Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <span className="px-4 text-xl font-bold">Teatro Apolo</span>
        </div>

        {/* Links */}
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-secondary">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/movies" prefetch={true}  className="hover:text-secondary">
              Cartelera
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-secondary">
              Contacto
            </Link>
          </li>
        </ul>

        {/* Botón login/logout */}
        <button
          onClick={isLoggedIn ? handleLogout : () => router.push('/login')}
          className="flex items-center gap-2 transition duration-200"
        >
          {isLoggedIn ? (
            <>
              <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-secondary-dark hover:text-secondary" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </>
          ) : (
            <>
              <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-secondary-dark hover:text-secondary" />
              <span className="hidden sm:inline">Iniciar sesión</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
