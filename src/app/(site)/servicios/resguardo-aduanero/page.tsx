import type { Metadata } from 'next';
import { ServiceProfile, type ServiceProfileContent } from '@/components/services/ServiceProfile';
import { ROUTES } from '@/lib/routes';

const description = 'Conoce cómo coordinamos el resguardo de carga en cabina o con vehículo de acompañamiento, junto con el transporte o como servicio independiente.';

export const metadata: Metadata = {
    title: 'Resguardo de Carga | AduanasPE',
    description,
    alternates: { canonical: 'https://aduanaspe.com/servicios/resguardo-aduanero/' },
    robots: { index: true, follow: true },
};

const service: ServiceProfileContent = {
    slug: 'resguardo-aduanero',
    name: 'Resguardo de carga',
    description,
    heading: 'Así coordinamos el resguardo de tu carga',
    introduction: 'Acordamos el acompañamiento del traslado con tu transportista y el equipo de resguardo. Antes de salir, definimos qué tramo se cubre, quién participa y cómo se reportan las novedades.',
    image: {
        src: '/images/despacho/retiro.webp',
        alt: 'Camión con un contenedor en la salida de un terminal portuario',
    },
    scope: [
        { title: 'Qué coordinamos', description: 'El acompañamiento de la carga durante el tramo acordado, con personal en cabina o un vehículo de acompañamiento, según la operación.' },
        { title: 'Qué recibes', description: 'La confirmación de la modalidad, los puntos de inicio y cierre del servicio, y las novedades que requieran coordinar con el transportista o con quien recibe.' },
        { title: 'Qué acordamos aparte', description: 'Puedes integrar el servicio al transporte o usar tu propio transportista. Si tu póliza o el cliente tienen requisitos específicos, los revisamos antes de definir el alcance.' },
    ],
    processTitle: 'Cómo preparamos el acompañamiento',
    process: [
        { title: 'Entendemos el traslado', description: 'Revisamos la mercancía, el trayecto, el horario previsto y si ya tienes transportista. También preguntamos si hay condiciones de aseguramiento o requisitos de recepción.', update: 'Qué datos faltan y qué modalidades pueden evaluarse para tu operación.' },
        { title: 'Acordamos el alcance', description: 'Definimos la modalidad y el punto donde empieza y termina el acompañamiento. Confirmamos con el transportista quién coordina los cambios y quién recibe en destino.', update: 'El tramo cubierto, los responsables y las condiciones que deben quedar confirmadas antes del inicio.' },
        { title: 'Coordinamos durante el trayecto', description: 'Mantenemos comunicación con los responsables de la operación. Si hay un cambio de horario o una incidencia, coordinamos según el alcance acordado.', update: 'La confirmación de inicio y las novedades que afecten el traslado o la recepción.' },
        { title: 'Confirmamos el cierre', description: 'Verificamos con el transportista y el responsable de recepción que se completó el tramo acordado.', update: 'El cierre del acompañamiento y cualquier asunto operativo pendiente.' },
    ],
    options: {
        id: 'modalidades',
        label: 'Modalidades',
        title: 'Cómo elegimos entre cabina y vehículo',
        items: [
            { title: 'Acompañamiento en cabina', description: 'El personal de resguardo acompaña al conductor dentro de la unidad. Confirmamos si esta modalidad se ajusta al tramo, al tipo de carga y a las condiciones del transportista.' },
            { title: 'Vehículo de acompañamiento', description: 'Un vehículo separado acompaña al transporte. Evaluamos esta opción según las características del traslado y los requisitos aplicables a la operación.' },
        ],
    },
    example: {
        title: 'Ejemplo ilustrativo con transportista propio',
        description: 'El cliente ya tiene contratado el camión y necesita agregar resguardo para el tramo entre el depósito y el almacén.',
        panelClassName: 'service-route-panel',
        steps: [
            { title: 'Validamos el alcance', description: 'Revisamos qué tramo requiere acompañamiento y las condiciones acordadas con el transportista.' },
            { title: 'Acordamos responsables', description: 'Confirmamos quién coordina el inicio, quién recibe novedades y quién recibe la carga.' },
            { title: 'Cerramos el servicio', description: 'Comunicamos que el acompañamiento terminó y si queda algún pendiente de coordinación.' },
        ],
    },
    experience: {
        title: 'Experiencia en la coordinación de la carga',
        description: 'AduanasPE nació de la experiencia en agencias de aduanas y coordina operaciones desde el Callao. En resguardo, esa experiencia ayuda a conectar el retiro, el transportista y la recepción para que el acompañamiento se coordine dentro del traslado.',
        panel: { title: 'Un punto de contacto durante el servicio', description: 'Tu ejecutivo centraliza las confirmaciones y los cambios que afecten el inicio o el cierre del acompañamiento.' },
        panelClassName: 'service-operations-panel',
    },
    faqs: [
        { question: '¿Puedo contratar resguardo con mi propio transportista?', answer: 'Sí. Podemos coordinar el acompañamiento como servicio independiente. Antes de confirmar, acordamos con tu transportista el tramo, la modalidad y los puntos de coordinación.' },
        { question: '¿Qué modalidad conviene para mi carga?', answer: 'Evaluamos la ruta, el tipo de mercancía, el horario, las características del traslado y los requisitos que hayas recibido. Con esa información podemos explicar qué opción encaja mejor.' },
        { question: '¿El servicio cubre todo el traslado?', answer: 'Cubre el tramo acordado antes de empezar. Puede coincidir con todo el traslado o limitarse a la parte que requiere acompañamiento.' },
        { question: '¿Qué pasa si cambia el horario de retiro?', answer: 'Revisamos el cambio con el transportista y el equipo de resguardo. Te confirmamos cómo afecta el inicio del acompañamiento y qué queda por coordinar.' },
        { question: '¿Cómo se calcula el costo?', answer: 'El costo depende de la modalidad, el tramo, la duración prevista y las características de la carga. Confirmamos el alcance para que puedas identificar qué está incluido.' },
    ],
    contact: {
        title: '¿Tu traslado requiere resguardo?',
        checklist: ['Punto de recojo, destino y fecha aproximada', 'Tipo de carga y tramo que necesita acompañamiento', 'Si ya tienes transportista o requisitos de tu aseguradora'],
        label: 'Consultar resguardo por WhatsApp',
        message: 'Quisiera consultar qué modalidad de resguardo puede ajustarse al traslado de mi carga.',
    },
    related: [
        { href: ROUTES.servicios.transporteDeCarga, label: 'Transporte terrestre' },
        { href: ROUTES.servicios.agenciamientoAduanas, label: 'Despacho aduanero' },
    ],
};

export default function ResguardoPage() {
    return <ServiceProfile service={service} />;
}
