
import React, { Component }  from 'react';
import styles from "../styles/t&c.module.css";
import { FormatAlignJustify } from '@material-ui/icons';

class TermsAndConditionsPage extends Component {
      
    componentDidMount() {
      window.scrollTo(0, 0);
      
      
    }
    
  
    
    render() {
      return (
        <div>
            <h1>Términos y Condiciones</h1>
            <div className= {styles.rowTC}>
              <div className= {styles.columnTC}>
                <img src="../../../pictures/t&c.png" width="100%" heigth="100%" alt="Datos personales"/>
              </div>
              <div className={styles.columnTC}>
                <div className={styles.spaceForm}>
                    <br/>
                    <h2>Tratamiento de datos personales</h2>
                            
                    <br/>
                    
                    <p align="justify" >
                    Se informa que los datos personales proporcionados a Chaska quedan incorporados al banco de datos de clientes de Chaska y que Chaska utilizará dicha información para efectos de la gestión de los productos y/o servicios solicitados y/o contratados (incluyendo evaluaciones financieras, procesamiento de datos, formalizaciones contractuales, cobro de deudas, gestión de operaciones financieras y remisión de correspondencia, entre otros), la misma que podrá ser realizada a través de terceros.
                    </p>
                    <p align="justify" classname={styles.bodyTC}>
                    Chaska protege estos bancos de datos y sus tratamientos con todas las medidas de índole técnica y organizativa necesarias para garantizar su seguridad y evitar la alteración, pérdida, tratamiento o acceso no autorizado.
                    </p>
                    <p  align="justify"classname={styles.bodyTC}>
                    Mediante la suscripción del presente documento, usted:
                    </p>
                    <p  align="justify"classname={styles.bodyTC}>
                    Autoriza a Chaska a utilizar sus datos personales (incluyendo datos sensibles) proporcionados a Chaska, aquellos que pudieran encontrarse en fuentes accesibles para el público o los que hayan sido válidamente obtenidos de terceros; para tratamientos que supongan desarrollo de acciones comerciales, realización de estudios de mercado, elaboración de perfiles de compra y evaluaciones financieras, la remisión, directa o por intermedio de terceros (vía medio físico, electrónico o telefónico) de publicidad, información, obsequios, ofertas y/o promociones (personalizadas o generales) de productos y/o servicios de Interbank y/o de otras empresas del Grupo Intercorp y sus socios estratégicos, entre las que se encuentran aquellas difundidas en el portal de la Superintendencia del Mercado de Valores (www.smv.gob.pe), así como en el portal www.intercorp.com.pe/es. Para tales efectos, el titular de los datos personales autoriza a Chaska la cesión, transferencia y/o comunicación de sus datos personales, a dichas empresas y entre ellas*.
                    Declara conocer que la suscripción de la presente autorización es de carácter libre y voluntaria y que, por tanto, no condiciona el otorgamiento y/o gestión de ninguno de los productos o servicios financieros ofrecidos por Chaska.
                    Chaska le informa que usted puede revocar la autorización a la que se refiere el numeral 3 anterior en cualquier momento, así como ejercer los derechos de acceso, rectificación, cancelación y oposición para el tratamiento de sus datos personales. Para ejercer estos derechos, o cualquier otro previsto en las normas referidas a la protección de sus datos personales, usted deberá presentar su solicitud en cualquiera de las tiendas de Chaska.
                    </p>
                    
                    <h2>Sobre el uso de cookies</h2>
                    <br/>
                    <p  align="justify" classname={styles.bodyTC}>
                    El sitio web de Chaska utiliza una tecnología llamada "cookies". 
                    </p>
                    <p align="justify" classname={styles.bodyTC}>
                    Una cookie es un número único y aleatorio que se almacena en el navegador de su computadora. La cookie no identifica al usuario, sólo el equipo que esta utilizando para visitar el sitio. Las cookies permiten a Chaska recopilar información de la navegación del usuario que no es identificable personalmente (es decir, es totalmente anónima). Por ejemplo, a través del uso de cookies, Chaska puede saber cuántos usuarios visitan el sitio web, a que secciones acceden o que navegador web utilizan cuando visitan el mismo.
                    </p>
                    <p  align="justify" classname={styles.bodyTC}>
                    Para recabar la información y someterla a un tratamiento estadístico, Chaska utiliza los servicios de Adobe Analytics; ello implica  que la recopilación y almacenamiento de la indicada información se realiza mediante cookies directamente entre el navegador del usuario y el servidor de Adobe Analytics. Cuando el usuario se conecte nuevamente con el sitio web de Chaska, el citado servidor reconocerá el número almacenado en cookie, según se ha indicado, suministrando la información anónima referida.
                    </p>
                    <p align="justify" classname={styles.bodyTC}>
                    La recopilación de la información a través de las cookies está gestionado y controlado exclusivamente por Adobe Analytics. Si desea conocer la declaración de privacidad y políticas de privacidad y cookies de Adobe Analytics puede hacerlo en esta dirección: http://www.adobe.com/es/privacy/policy.html
                    </p>
                    <p align="justify" classname={styles.bodyTC}>
                    Al aceptar el uso de cookies, Chaska puede personalizar la experiencia de navegación del usuario en el sitio web y presentarle promociones que pueden ser de su interés. Sin embargo, si el usuario no desea información recopilada mediante el uso de cookies, este puede  desactivar su uso mediante la modificación de los parámetros de configuración de su navegador (consulte las instrucciones de su navegador para realizarlo). La desactivación no impide la visualización de las páginas de este sitio web ni interfiere en la navegación del usuario. 
                    </p>
                    <br/><br/>
                </div>
                <br/>
            </div>
          </div>

        </div>
      );
    }
  }
  
  
  export default TermsAndConditionsPage;
  