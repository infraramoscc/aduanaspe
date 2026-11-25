import type { Metadata } from 'next';
import { ServiceProfile, type ServiceProfileContent } from '@/components/services/ServiceProfile';
import { ROUTES } from '@/lib/routes';
import { mainPageImages } from '@/content/mainPageImages';

const description = 'Conoce cómo revisamos una decisión aduanera, qué información necesitamos y qué recibe tu equipo para decidir cómo avanzar.';

export const metadata: Metadata = {
    title: 'Consultoría Aduanera | AduanasPE',
    description,
    alternates: { canonical: 'https://aduanaspe.com/servicios/consultoria-aduanera/' },
    robots: { index: true, follow: true },
};

const service: ServiceProfileContent = {
    slug: 'consultoria-aduanera',
    name: 'Consultoría aduanera',
    description,
    heading: 'Así analizamos tu caso antes de que decidas',
    introduction: 'Empezamos por entender qué necesitas resolver. Si hace falta una revisión técnica, acordamos qué documentación vamos a analizar y qué recibirás para tomar una decisión.',
    image: mainPageImages.trade.middle,
    scope: [
        { title: 'Qué revisamos', description: 'Una decisión concreta sobre clasificación, requisitos, origen preferencial, régimen aduanero, costos o una observación en una operación en curso.' },
        { title: 'Qué recibes', description: 'Una explicación de lo que muestran los documentos, qué falta verificar y qué opciones evaluamos. El formato y el nivel de detalle se acuerdan al definir el encargo.' },
        { title: 'Qué acordamos aparte', description: 'La orientación inicial es sin costo y ayuda a delimitar la consulta. El análisis especializado, la capacitación, la ejecución del despacho o el apoyo con una incidencia se acuerdan según el caso.' },
    ],
    processTitle: 'De la pregunta al siguiente paso',
    process: [
        { title: 'Precisamos la decisión', description: 'Ubicamos el problema y la etapa de la operación. Si existe una notificación, pedimos su fecha y la información que ya tienes disponible para entender el contexto.', update: 'Si basta una orientación inicial o conviene delimitar un análisis técnico.' },
        { title: 'Reunimos los antecedentes', description: 'Según la consulta, revisamos documentos comerciales, fichas técnicas, documentos de transporte o antecedentes de la operación.', update: 'Qué documentos podemos usar y qué dato faltante podría cambiar la evaluación.' },
        { title: 'Evaluamos las opciones', description: 'Contrastamos lo que dicen los documentos con los criterios que correspondan al caso y revisamos las implicaciones de cada alternativa.', update: 'Qué opciones tienen sustento, qué debe confirmarse y qué decisiones dependen de esa información.' },
        { title: 'Explicamos cómo avanzar', description: 'Presentamos la conclusión en el formato acordado y aclaramos qué corresponde preparar, confirmar o ejecutar antes de dar el siguiente paso.', update: 'Qué puedes decidir con lo revisado y qué tareas requieren otro alcance o responsable.' },
    ],
    options: {
        id: 'servicios',
        label: 'Temas de consulta',
        title: 'Qué decisiones podemos revisar contigo',
        items: [
            { title: 'Partida arancelaria y requisitos', description: 'Revisamos la composición, la función y la documentación del producto para evaluar su clasificación y los requisitos que corresponda comprobar.' },
            { title: 'Acuerdos comerciales y origen', description: 'Revisamos el origen, el acuerdo relevante y los documentos que respaldan una eventual preferencia antes de contar con ese beneficio.' },
            { title: 'Regímenes y costos', description: 'Comparamos las alternativas del caso según el destino de la mercancía, los documentos disponibles y los costos que se puedan estimar.' },
            { title: 'Operaciones pasadas y contingencias', description: 'Revisamos documentación de operaciones previas, observaciones de valor y notificaciones. También podemos definir una capacitación para que tu equipo reconozca estos pendientes.' },
        ],
    },
    example: {
        title: 'Ejemplo ilustrativo antes de confirmar una compra',
        description: 'Un proveedor ofrece dos versiones de un producto con usos distintos. El importador necesita saber si cambiar de versión puede afectar los requisitos o el costo de la operación.',
        panelClassName: 'service-risk-panel',
        steps: [
            { title: 'Pedimos la información técnica', description: 'Comparamos fichas, composición y función de cada versión.' },
            { title: 'Identificamos qué cambia', description: 'Evaluamos las posibles diferencias de clasificación y qué requisitos deben verificarse.' },
            { title: 'Dejamos claros los pendientes', description: 'Explicamos qué dato pedir al proveedor antes de confirmar la compra.' },
        ],
    },
    experience: {
        title: 'Experiencia aduanera aplicada a tu caso',
        description: 'AduanasPE nació de la experiencia de dos hermanos en agencias de aduanas. Ese trabajo nos enseñó a relacionar una pregunta técnica con los documentos que importadores y exportadores tienen que preparar en la práctica.',
        panel: { title: 'La recomendación parte de tus documentos', description: 'Contrastamos la descripción de la mercancía con el sustento disponible y te explicamos qué puede concluirse con esos antecedentes y qué sigue abierto.' },
        panelClassName: 'service-advisory-panel',
    },
    faqs: [
        { question: '¿Cuándo basta la orientación inicial?', answer: 'Cuando la duda se puede aclarar con el contexto básico, la orientación inicial ayuda a identificar el siguiente paso. Si hay que estudiar documentos, comparar escenarios o revisar una incidencia, definimos el alcance de la consultoría antes de empezar.' },
        { question: '¿Qué diferencia hay entre consultoría y despacho aduanero?', answer: 'La consultoría analiza una decisión o contingencia. El agenciamiento de aduanas ejecuta el despacho según el alcance contratado. Podemos indicar en qué punto conviene coordinar ambos servicios.' },
        { question: '¿Qué documentos debo preparar?', answer: 'Depende de la consulta. Puedes empezar con la descripción de tu pregunta, la ficha del producto y los documentos comerciales disponibles. Si hay un requerimiento, indica la fecha de notificación y qué te han solicitado.' },
        { question: '¿Revisan operaciones anteriores o capacitan a equipos?', answer: 'Sí. Podemos definir una revisión de antecedentes de operaciones anteriores o una capacitación según los temas que tu equipo necesite trabajar.' },
        { question: '¿Cómo se define el costo y lo que recibiré?', answer: 'Revisamos la pregunta, el número y el tipo de documentos, la profundidad del análisis y el formato que necesitas. Con esos datos presentamos el alcance antes de iniciar.' },
    ],
    contact: {
        title: '¿Qué decisión aduanera necesitas aclarar?',
        checklist: ['La pregunta que necesitas resolver y la etapa de tu operación', 'Tipo de mercancía y documentos que ya tienes', 'Si hay una notificación, su fecha y el tema que señala'],
        label: 'Pedir orientación inicial por WhatsApp',
        message: 'Quisiera una orientación inicial sobre una decisión aduanera.',
        messageKey: 'asesoria_gratis',
    },
    related: [
        { href: ROUTES.servicios.agenciamientoAduanas, label: 'Despacho aduanero' },
        { href: ROUTES.servicios.ajusteValorAduanero, label: 'Ajuste de valor' },
        { href: ROUTES.servicios.multasAduanerasSunat, label: 'Notificaciones y multas' },
    ],
    reading: [
        'notificacion-sunat-aduanas-que-hacer',
        'descargo-multa-aduanera-sunat',
        'como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru',
    ],
};

export default function ConsultoriaAduaneraPage() {
    return <ServiceProfile service={service} />;
}
