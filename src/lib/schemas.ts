import { z } from 'zod';

// Schema para formulario de Diagnóstico
export const diagnosticoSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    tipo_operacion: z.enum(['importacion', 'exportacion', 'ambos', 'no_se'], {
        message: 'Selecciona un tipo de operación',
    }),
    mensaje: z.string().optional(),
});

// Schema para formulario de Pre-cotización
export const precotizacionSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    empresa: z.string().optional(),
    email: z.string().email('Email inválido'),
    telefono: z.string().optional(),
    tipo_carga: z.enum(['maritima', 'aerea', 'terrestre', 'courier'], {
        message: 'Selecciona un tipo de carga',
    }),
    origen_destino: z.string().optional(),
    descripcion: z.string().optional(),
    servicio: z.string().optional(), // Nombre del servicio desde donde se envía
});

// Schema para formulario de Contacto
export const contactoSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    asunto: z.string().min(3, 'El asunto debe tener al menos 3 caracteres'),
    mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

// Tipos inferidos de los schemas
export type DiagnosticoData = z.infer<typeof diagnosticoSchema>;
export type PrecotizacionData = z.infer<typeof precotizacionSchema>;
export type ContactoData = z.infer<typeof contactoSchema>;

// Schema unificado para la API
export const formRequestSchema = z.discriminatedUnion('formType', [
    z.object({
        formType: z.literal('diagnostico'),
        data: diagnosticoSchema,
    }),
    z.object({
        formType: z.literal('precotizacion'),
        data: precotizacionSchema,
    }),
    z.object({
        formType: z.literal('contacto'),
        data: contactoSchema,
    }),
]);

export type FormRequest = z.infer<typeof formRequestSchema>;
