<img width="1376" height="768" alt="Gemini_Generated_Image_oyv0zmoyv0zmoyv0" src="https://github.com/user-attachments/assets/c5f292b8-f451-4dc6-9d78-d35a1ca7fe02" />

# React2P4IM0Nshell
💥Extension Tool para Auditoría y Explotación avanzada RCE/Source Leak/Dos (CVE-2025-55182/83/84) para entornos Next.js y React Server Components (RSC) directamente desde tu navegador, con terminal linux incorporada en la propia extension para resibir cualquier reverse shell ❌

[![React2P4IM0Nshell 🛑 Extensión Tool escan y exploit (RCE/codeLeak/Dos Atack) ☢ CVE-2025-55182/83/84 💥](https://img.youtube.com/vi/_7U7Nqs_-QQ/hqdefault.jpg)](https://www.youtube.com/watch?v=_7U7Nqs_-QQ)

![photo_5037492744514898704_w](https://github.com/user-attachments/assets/b2fd2f98-dcb9-4b18-bc1d-6220015d1b14)


⚡ CMD_CENTER: El Núcleo

👁️ Reconocimiento Pasivo

Analizo el DOM y cabeceras HTTP en silencio. Detecto firmas como window.__next_f y text/x-component para identificar arquitecturas Next.js App Router sin alertar al WAF. 🕵️‍♂️

📡 Sonda Activa (Handshake)

Envío una petición controlada con la cabecera RSC: 1. Si el servidor responde con el protocolo React Flight serializado, confirmo que el endpoint interpreta componentes de servidor. 🎯

![photo_5037492744514898700_x](https://github.com/user-attachments/assets/2c6b85a4-6c57-4a5c-b50b-9312d6c08a17)


💀 Módulos de Explotación (CVEs)

💥 CVE-2025-55182 (RCE)

Ataque de deserialización. Inyecto un payload JSON multipart que fuerza la ejecución de child_process.execSync en el backend, permitiéndome correr comandos arbitrarios como id o ls. 💻

🔓 CVE-2025-55183 (Source Leak)

Extraigo Action IDs de los chunks JS públicos. Manipulo la petición para que el servidor "encadene" sus propias funciones, filtrando su código fuente y lógica de negocio. 📝

🛑 CVE-2025-55184 (DoS Cíclico)

Envío referencias de promesas circulares ($@1 -> $@0). Esto provoca un bucle infinito en el servidor. Si la petición muere por timeout, la vulnerabilidad está confirmada. ⏳

![photo_5042010423045065508_w](https://github.com/user-attachments/assets/c5e2c912-fc31-4565-b25a-50b526a809b5)


🛠️ Herramientas Tácticas

💻 Terminal Embebida (Alpine Linux)

Máquina virtual Alpine x86 completa en memoria. Anonimiza tu tráfico vía WebSocket Relay. Perfecta para gestionar conexiones SSH o túneles sin exponer tu IP real. 🛡️

📋 Generador de Payloads

Menú de acceso rápido con One-Liners para Reverse Shells (Bash, Netcat, PowerShell). Clic para copiar y listo para desplegar en la terminal o en el input RCE. 🚀

📡 Pestaña RECON: Inteligencia

🤖 Google Neural Uplink

Utilizo IA (Gemini) con Grounding en Google Search. Traduzco tus filtros técnicos a Dorks avanzados para encontrar y listar objetivos reales y vulnerables en segundos. 🌐

🔭 Shodan Link Manual

Acceso directo para validación cruzada. Abro búsquedas pre-filtradas en Shodan para corroborar la exposición de componentes Next.js en la infraestructura global. 🌍

⚠️ Disclaimer Ético

Esta herramienta es una prueba de concepto (POC) para investigación de seguridad y laboratorios autorizados. No me hago responsable del mal uso que se le dé. 🛡️

Developed by P4IM0N


🛠️ Guía de Instalación y Uso (Extensión de Chrome)
Para comenzar a utilizar la herramienta de forma ética, sigue estos sencillos pasos para cargar la extensión en tu navegador Google Chrome y preparar el entorno de laboratorio.

1. 🌐 Preparación del Laboratorio Vulnerable
Antes de cargar la extensión, debes configurar el entorno vulnerable para practicar:

Localiza el Archivo ZIP: En la raíz de este repositorio, encontrarás un archivo llamado laboratorio-vulnerable.zip.

Extracción: Es IMPERATIVO que muevas este archivo ZIP fuera de la carpeta del repositorio que descargaste.

⚠️ ¡ATENCIÓN! Extrae el archivo laboratorio-vulnerable.zip a una ubicación segura y separada. Este archivo contiene el código del servidor vulnerable listo para ser desplegado.

Despliegue (VPS/Entorno Local):

Sube el contenido extraído (laboratorio-vulnerable) a tu VPS (Servidor Privado Virtual) o a un entorno de prueba local (como una máquina virtual).

Ejecuta el script deploy.sh (o el equivalente para tu sistema) para iniciar el servidor vulnerable.

Propósito: Este paso asegura que tengas un blanco legítimo y controlado para practicar la explotación de forma ética.

2. 🛡️ Carga de la Extensión en Chrome
Una vez que tengas el laboratorio desplegado y accesible, carga la extensión de Chrome:

Abre el Administrador de Extensiones de Chrome:

Escribe en la barra de direcciones: chrome://extensions

Activa el "Modo Desarrollador":

Busca el interruptor en la esquina superior derecha y asegúrate de que esté activado (el botón debe estar en azul/activo).

Carga la Extensión:

Haz clic en el botón "Cargar extensión sin empaquetar" (Load unpacked).

Selecciona la Carpeta:

Navega a la carpeta principal de este repositorio que descargaste.

Selecciona la subcarpeta que contiene los archivos de la extensión (generalmente llamada extension, chrome-extension, o similar).

Haz clic en "Seleccionar carpeta".

¡Listo!

La extensión aparecerá en tu lista y su icono debería ser visible en la barra de herramientas de Chrome.

¡Ya puedes utilizar tu extensión para escanear y probar las vulnerabilidades en tu propio laboratorio de forma responsable! 🧠💻
