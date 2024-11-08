import Header from "@/components/header/header"
import Perfil from "@/components/perfil/perfil"
import MyHistory from "@/components/myHistory/myHistory"
import Experiences from "@/components/experiences/experiences"
import Footer from "@/components/footer/footer"
export default function Profile(){
    return(
    <div>
            {/* <Header/> */}
            <Perfil/>
            <MyHistory/>
            <Experiences/>
            <Footer/>
   </div>

    )
}