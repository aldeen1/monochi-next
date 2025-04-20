'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Switch } from '@headlessui/react'
import LoginContainer from '../login/container/LoginContainer'
import RegisterContainer from '../register/container/RegisterContainer'

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-custom-white text-accent-blue p-4">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center mb-6 gap-3">
                    <span className={`text-lg ${!isLogin ? 'text-gray-400' : ''}`}>Login</span>
                    <Switch
                        checked={!isLogin}
                        onChange={() => setIsLogin(!isLogin)}
                        className={`${
                            !isLogin ? 'bg-accent-purple' : 'bg-accent-blue'
                        } relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none`}
                    >
                        <span className="sr-only">Toggle auth mode</span>
                        <span
                            className={`${
                                !isLogin ? 'translate-x-8' : 'translate-x-1'
                            } inline-block h-6 w-6 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                    <span className={`text-lg ${isLogin ? 'text-gray-400' : ''}`}>Register</span>
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? 'login' : 'register'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isLogin ? <LoginContainer /> : <RegisterContainer />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AuthContainer 