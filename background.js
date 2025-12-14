// React2P4IM0Nshell - Controlador de Fondo
// Autor: P4IM0N

chrome.runtime.onMessage.addListener((solicitud, emisor, enviarRespuesta) => {
    // Escuchar señales desde el script de contenido (content.js)
    if (solicitud.accion === "actualizar_insignia" && emisor.tab) {
        // Alerta Visual Roja cuando se detecta vulnerabilidad
        chrome.action.setBadgeBackgroundColor({
            tabId: emisor.tab.id,
            color: "#FF003C" // Rojo Cyberpunk
        });
        
        chrome.action.setBadgeText({
            tabId: emisor.tab.id,
            text: "PWN" // Texto de insignia: 'PWNED' abreviado
        });

        console.log(`[P4IM0N] Objetivo vulnerable detectado en ID de Pestaña: ${emisor.tab.id}`);
    }
});