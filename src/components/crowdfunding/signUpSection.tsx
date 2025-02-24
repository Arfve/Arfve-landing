import React from 'react';

const SignUpSection: React.FC = (signUpSection) => {
    return (
        <div>
            <h2>Sign Up for Our Crowdfunding Campaign</h2>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpSection;