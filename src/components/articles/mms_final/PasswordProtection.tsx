import React, { useState, useEffect } from 'react';
import styles from './styles/mms_final.module.css';

interface PasswordProtectionProps {
    children: React.ReactNode;
    articleTag: string;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children, articleTag }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if already authenticated
        const storedAuth = localStorage.getItem('mms_final_authenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === articleTag) {
            setIsAuthenticated(true);
            localStorage.setItem('mms_final_authenticated', 'true');
            setError('');
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('mms_final_authenticated');
        setPassword('');
        setError('');
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.passwordContainer}>
                <div className={styles.passwordForm}>
                    <h2>Password Protected</h2>
                    <p>Please enter the password to access this content.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className={styles.passwordInput}
                            autoFocus
                        />
                        {error && <div className={styles.passwordError}>{error}</div>}
                        <button type="submit" className={styles.passwordButton}>
                            Access Content
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.protectedContent}>
            {children}
        </div>
    );
};

export default PasswordProtection;
