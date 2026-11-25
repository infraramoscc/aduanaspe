import type { Metadata } from 'next';
import { ServiceProfile, type ServiceProfileContent } from '@/components/services/ServiceProfile';
import { ROUTES } from '@/lib/routes';
import { mainPageImages } from '@/content/mainPageImages';

const description = 'Conoce cómo coordinamos el retiro, el transporte terrestre y la entrega de carga desde puerto, aeropuerto o depósito hacia Lima y provincias.';

export const metadata: Metadata = {
    title: 'Transporte de Carga desde Puerto y Aeropuerto | AduanasPE',
    description,
    alternates: { canonical: 'https://aduanaspe.com/servicios/transporte-de-carga/' },
    robots: { index: true, follow: true },
};

const service: ServiceProfileContent = {
    slug: 'transporte-de-carga',
    name: 'Transporte de carga',
    description,
    heading: 'Así llevamos tu carga del terminal al almacén',
    introduction: 'Coordinamos el retiro y el traslado terrestre desde puerto, aeropuerto o depósito. Acordamos la unidad, la recepción y cómo te informamos durante el trayecto.',
    image: mainPageImages.services.lower,
    scope: [
        { title: 'Qué coordinamos', description: 'El retiro en el punto acordado, la unidad adecuada para tu mercancía y la entrega en tu almacén u otro destino. Evaluamos traslados en Callao, Lima y hacia provincias.' },
        { title: 'Qué recibes', description: 'El alcance del traslado, la confirmación de la programación y avisos de los hitos del retiro y la entrega, con los pendientes que puedan afectar el horario.' },
        { title: 'Qué acordamos aparte', description: 'Confirmamos si hace falta resguardo, seguro, maniobras de carga o descarga, o la devolución de un contenedor vacío. Su coordinación depende del alcance acordado.' },
    ],
    processTitle: 'Del retiro a la recepción',
    process: [
        { title: 'Revisamos la carga y el destino', description: 'Pedimos peso, dimensiones, embalaje y puntos de retiro y entrega. Revisamos el acceso al almacén y si hay una ventana de recepción.', update: 'Qué unidad podemos evaluar y qué información falta para programar.' },
        { title: 'Confirmamos las condiciones del retiro', description: 'Coordinamos con el terminal o depósito, el transportista y el responsable del despacho cuando corresponda. Verificamos que la carga esté disponible y revisamos el horario de retiro.', update: 'La programación prevista y cualquier condición pendiente antes de enviar la unidad.' },
        { title: 'Seguimos el traslado', description: 'Confirmamos el inicio del traslado con el operador, consultamos el monitoreo disponible para la unidad y coordinamos con el punto de entrega si cambia el horario previsto.', update: 'Si la carga ya salió, la hora estimada de llegada y los cambios que requieran ajustar la recepción.' },
        { title: 'Confirmamos la entrega', description: 'Coordinamos la recepción con la persona designada. Si corresponde, confirmamos quién continúa con los pendientes de descarga o devolución de equipo.', update: 'La confirmación de entrega y cualquier pendiente que deba cerrarse.' },
    ],
    options: {
        id: 'unidades',
        label: 'Unidades y rutas',
        title: 'Cómo elegimos la unidad y el tramo',
        items: [
            { title: 'Furgón o camión', description: 'Evaluamos unidades para bultos, cajas o pallets según el peso, el volumen y la forma de cargar y descargar.' },
            { title: 'Plataforma', description: 'La evaluamos para contenedores o maquinaria según dimensiones, compatibilidad de la unidad y condiciones de maniobra.' },
            { title: 'Unidad con acceso lateral', description: 'Una unidad tipo ala de gaviota puede facilitar la maniobra cuando el punto de carga o descarga permite operar por los lados.' },
            { title: 'Lima, Callao y provincias', description: 'Confirmamos la cobertura y el operador para cada destino. Para provincias, revisamos si el traslado es directo o requiere coordinación con otro transportista.' },
        ],
    },
    example: {
        title: 'Ejemplo ilustrativo de un retiro con horario de entrega',
        description: 'Un depósito tiene la carga lista para retiro, pero el almacén del importador solo recibe por la tarde. La programación debe contemplar ambos horarios.',
        panelClassName: 'service-transport-panel',
        steps: [
            { title: 'Antes de enviar la unidad', description: 'Confirmamos la disponibilidad de la carga y la ventana de recepción.' },
            { title: 'Durante el traslado', description: 'Si se retrasa la salida, actualizamos la llegada prevista con el almacén.' },
            { title: 'Al entregar', description: 'Confirmamos la recepción y comunicamos cualquier pendiente del traslado.' },
        ],
    },
    experience: {
        title: 'Experiencia conectando el despacho con la entrega',
        description: 'AduanasPE nació de la experiencia de dos hermanos en agencias de aduanas. Desde el Callao, aplicamos esa experiencia al coordinar el paso del terminal o depósito al transporte, y del transporte al almacén de destino.',
        panel: { title: 'Tu punto de contacto', description: 'Tu ejecutivo centraliza la comunicación con el operador y te indica qué está confirmado y qué falta para retirar o recibir la mercancía.' },
        panelClassName: 'service-control-panel',
    },
    faqs: [
        { question: '¿Qué datos determinan el costo del traslado?', answer: 'Revisamos el punto de retiro, el destino, el tipo de unidad, el peso y las dimensiones. Confirmamos si hay condiciones adicionales, como maniobras, espera o devolución de equipo, antes de acordar el alcance.' },
        { question: '¿Pueden retirar desde un aeropuerto o depósito?', answer: 'Sí. Revisamos el punto exacto de retiro, los horarios y las condiciones del operador. Antes de programar, confirmamos qué documentos o coordinaciones hacen falta.' },
        { question: '¿Hacen entregas a provincias?', answer: 'Coordinamos traslados hacia provincias según ruta, tipo de carga y disponibilidad de transporte. Definimos con quién se realiza cada tramo y cómo se confirma la entrega.' },
        { question: '¿El traslado incluye seguro o resguardo?', answer: 'El seguro y el resguardo se acuerdan según las características del traslado. Puedes consultar por ambos al definir la operación.' },
        { question: '¿Qué pasa si la carga todavía está en despacho?', answer: 'Podemos adelantar la revisión de la unidad, los accesos y los horarios. La programación del retiro queda sujeta a que el operador confirme la disponibilidad de la carga.' },
    ],
    contact: {
        title: '¿Estás preparando un retiro o una entrega?',
        checklist: ['Punto de retiro y dirección de entrega', 'Tipo de mercancía, bultos, peso y dimensiones', 'Fecha estimada y restricciones de acceso o recepción'],
        label: 'Consultar transporte por WhatsApp',
        message: 'Quisiera consultar cómo coordinar el retiro y traslado de mi carga.',
    },
    related: [
        { href: ROUTES.servicios.agenciamientoAduanas, label: 'Despacho aduanero' },
        { href: ROUTES.servicios.resguardoAduanero, label: 'Resguardo de carga' },
        { href: ROUTES.servicios.agenciaCargaInternacional, label: 'Carga internacional' },
    ],
};

export default function TransportePage() {
    return <ServiceProfile service={service} />;
}
