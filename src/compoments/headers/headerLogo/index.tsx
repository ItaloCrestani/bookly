import logo from '../../../assets/logo.svg'
import logoLight from '../../../assets/logolight.svg'

import { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'

export function HeaderLogo() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='lg:hidden flex justify-center w-full py-3 bg-(--bg-1) border-b border-(--border) rounded-b-3xl'>
      <img src={theme === "light" ? logoLight : logo} className='h-6' />
    </div>
  )
}