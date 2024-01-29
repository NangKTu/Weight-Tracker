import Footer from "../Homepage/Footer"
import Header2 from "./Header2"
import { Link } from "react-router-dom";

const MemPage = () => {
  return (
    <>
      <Header2 />
      <main className='py-3'>
        <Link to="/"><h1 className="text-center">Weight Tracker</h1></Link>
      </main>
      <Footer />
    </>
  )
}

export default MemPage
