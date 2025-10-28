import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { PDFViewer } from '@react-pdf/renderer';
import './App.css'
import DocketPDF from './PDF/Docket/DocketPDF';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PDFViewer  style={{width:"100%", height:"100vh"}}>
    <DocketPDF/>
  </PDFViewer>

     
    </>
  )
}

export default App
