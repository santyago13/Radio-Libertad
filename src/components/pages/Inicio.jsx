import Carrusel from '../Carrusel'
import ClimaSemanal from '../ClimaSemanal'
import Contactanos from '../Contactanos';
import Logos from './Logos';

const Inicio = () => {
  return (
    // El pt-[130px] empuja el contenido hacia abajo en celulares.
    // El md:pt-[140px] le da un poquito más de espacio en computadoras.
    <div className="pt-25 md:pt-30">
      <Carrusel />
      <ClimaSemanal />
      <Logos/>
      <Contactanos/>
    </div>
  );
};

export default Inicio;