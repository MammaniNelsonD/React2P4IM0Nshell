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

![photo_5037386259390729086_w (1)](https://github.com/user-attachments/assets/580f5675-b245-4b1c-8fd0-26b70cc0a51d)


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
