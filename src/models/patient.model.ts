export interface IPatient {
  resultado: IResultado[];
  obtenerPrescripcion: IObtenerPrescripcion[];
}

export interface IObtenerPrescripcion {
  paciente: IPaciente;
  formula: IFormula;
}

interface IFormula {
  numero: string;
  mipres: string;
  preautorizacion: string;
  numeroSistemaOrigen: string;
  fechaServicio: string;
  fechaEntrega: string;
  fechaVencimiento: string;
  fechaSolicitud: string;
  fechaPreaprobacion: string;
  status: string;
  exento: string;
  categoria: ICategoria;
  diagnostico: ICategoria;
  ips: Ips;
  prestador: IPrestador;
  tratamiento: ITratamiento[];
  dispensacion: IDispensacion;
}

interface IDispensacion {
  sucursal: string;
  codigo: string;
  subCodigo: string;
  direccion: IDireccion2;
}

interface IDireccion2 {
  ciudad: IUnidad;
}

interface ITratamiento {
  id: string;
  orden: string;
  preautorizacion: string;
  fechaVencimiento: string;
  estado: string;
  numeroEntrega: string;
  producto: IProducto;
  cantidad: string;
  valor: string;
  pago: IPago;
  dosis: IDosis;
}

interface IDosis {
  unidad: IUnidad;
  periodo: IPeriodo;
  duracion: IPeriodo;
}

interface IPeriodo {
  cantidad: string;
}

interface IUnidad {
  nombre: string;
}

interface IPago {
  valor: string;
  porcentaje: string;
}

interface IProducto {
  mapis: string;
  descripcion: string;
  cum: string;
  tecnologia: ITecnologia;
  concentracion: string;
  cantidadDeEntregas: string;
}

interface ITecnologia {
  tipo: string;
  codigo: string;
}

interface IPrestador {
  codigo: string;
  nombre: Nombre2;
}

interface Nombre2 {
  completo: string;
}

interface Ips {
  codigo: string;
  sucursal: string;
  nombre: string;
  direccion: IDireccion;
}

interface IDireccion {
  departamento: IDepartamento;
  ciudad: IDepartamento;
}

interface IDepartamento {
  id: string;
}

interface ICategoria {
  codigo: string;
}

interface IPaciente {
  documento: IDocumento;
  nombre: INombre;
  edad: string;
  genero: string;
  telefono: string;
  celular: string;
  direccionPrincipal: string;
  correoElectronico: string;
  regimen: IRegimen;
  clasificacion: IClasificacion;
}

interface IClasificacion {
  codigo: string;
  nombre: string;
}

interface IRegimen {
  tipo: string;
  nivelSisben: string;
}

interface INombre {
  primero: string;
  segundo: string;
  primerApellido: string;
  segundoApellido: string;
}

interface IDocumento {
  tipo: string;
  numero: string;
}

interface IResultado {
  codigo: string;
  descripcion: string;
}