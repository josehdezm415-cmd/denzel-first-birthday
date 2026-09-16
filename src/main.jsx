import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Gift, Heart, MapPin, MessageCircle, PartyPopper, Share2, Sparkles, Star } from 'lucide-react';
import './styles.css';

const invitation = {
  childName: 'Denzel',
  fullTitle: 'Cumpleaños #1 de Denzel',
  dateText: '18 de octubre',
  dayText: 'Domingo',
  timeText: '3:30 p.m.',
  year: '2026',
  eventStartIso: '2026-10-18T15:30:00-06:00',
  eventEndIso: '2026-10-18T18:30:00-06:00',
  locationText: 'Barrio El Progreso — Casa donde mi abuelita Ofre',
  wazeUrl: 'https://waze.com/ul/hd42tgpwpe',
  rsvpPhoneDisplay: '7956 7733',
  rsvpPhoneWa: '50379567733',
  giftNote: 'Soy talla 3T. Regalo de sobre es bienvenido. Por favor, no juguetes.'
};

const siteUrl = 'https://josehdezm415-cmd.github.io/denzel-first-birthday/';

function formatGoogleDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function getCountdownParts(targetIso) {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000)
  };
}

const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(invitation.fullTitle)}&dates=${formatGoogleDate(invitation.eventStartIso)}/${formatGoogleDate(invitation.eventEndIso)}&details=${encodeURIComponent(`Acompáñanos a celebrar el primer añito de ${invitation.childName}. RSVP: ${invitation.rsvpPhoneDisplay}. ${siteUrl}`)}&location=${encodeURIComponent(invitation.locationText)}`;
const rsvpYes = `https://wa.me/${invitation.rsvpPhoneWa}?text=${encodeURIComponent(`Hola, sí confirmo mi asistencia al cumpleaños de ${invitation.childName}.`)}`;
const rsvpNo = `https://wa.me/${invitation.rsvpPhoneWa}?text=${encodeURIComponent(`Hola, gracias por la invitación al cumpleaños de ${invitation.childName}. No podré asistir, pero les deseo muchas bendiciones.`)}`;
const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Te comparto la invitación al cumpleaños #1 de ${invitation.childName}: ${siteUrl}`)}`;

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getCountdownParts(invitation.eventStartIso));
  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getCountdownParts(invitation.eventStartIso)), 60000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="countdown" aria-label="Cuenta regresiva">
      <span>Faltan</span>
      <strong>{timeLeft.days}</strong><small>días</small>
      <strong>{timeLeft.hours}</strong><small>horas</small>
      <strong>{timeLeft.minutes}</strong><small>min</small>
    </div>
  );
}

function Button({ href, children, icon: Icon, variant = 'primary', ...props }) {
  return <a className={`button ${variant}`} href={href} {...props}>{Icon ? <Icon size={18} /> : null}<span>{children}</span></a>;
}

function FloatingDecor() {
  return (
    <div className="decor" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => <span key={i} className={`float f${i % 6}`} style={{ '--i': i }} />)}
    </div>
  );
}

function App() {
  const photoPlaceholders = useMemo(() => [
    'Foto de Denzel', 'Con la familia', 'Mi primer añito', 'Momentos especiales'
  ], []);

  return (
    <main>
      <FloatingDecor />
      <section className="hero">
        <nav className="topbar">
          <a href="#detalles">Detalles</a>
          <a href="#fotos">Fotos</a>
          <a href="#ubicacion">Ubicación</a>
          <a href="#rsvp">RSVP</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <img className="plim-logo" src="./assets/plim-logo.png" alt="Plim Plim" />
            <p className="eyebrow"><PartyPopper size={18} /> ¡Celebremos juntos!</p>
            <h1><span className="title-word">Cumpleaños</span><span className="title-line"><span className="title-number">#1</span> de Denzel</span></h1>
            <p className="intro">Con mucha alegría queremos invitarte a celebrar el primer añito de nuestro querido Denzel.</p>
            <p className="subintro">Acompáñanos a vivir una tarde llena de alegría, colores y mucha diversión al estilo Plim Plim.</p>
            <div className="hero-actions">
              <Button href="#rsvp" icon={MessageCircle}>Confirmar asistencia</Button>
              <Button href={invitation.wazeUrl} icon={MapPin} variant="secondary" target="_blank" rel="noopener">Abrir en Waze</Button>
            </div>
          </div>

          <div className="hero-art">
            <div className="sunburst" />
            <div className="photo-card placeholder-photo">
              <span>Foto de Denzel aquí</span>
              <small>envíame la foto principal y la coloco</small>
            </div>
            <img className="plim-character" src="./assets/plim-character.png" alt="Plim Plim" />
          </div>
        </div>
      </section>

      <section id="detalles" className="section details-section">
        <div className="section-title">
          <Sparkles />
          <p>Detalles de la fiesta</p>
          <h2>Una tarde para celebrar a Denzel</h2>
        </div>
        <div className="cards three">
          <article className="info-card red">
            <CalendarDays />
            <span>Fecha y hora</span>
            <strong>{invitation.dayText}, {invitation.dateText}</strong>
            <p>{invitation.timeText}</p>
          </article>
          <article className="info-card blue">
            <MapPin />
            <span>Lugar</span>
            <strong>{invitation.locationText}</strong>
            <p>Pasaje Caribe, Soyapango</p>
          </article>
          <article className="info-card yellow">
            <Gift />
            <span>Detalle</span>
            <strong>Regalito</strong>
            <p>{invitation.giftNote}</p>
          </article>
        </div>
        <Countdown />
      </section>

      <section className="character-band">
        <div>
          <p>Temática</p>
          <h2>Plim Plim y sus amigos</h2>
          <span>Colores, globos, estrellas y mucha alegría para celebrar el primer añito.</span>
        </div>
        <img src="./assets/plim-products.jpg" alt="Plim Plim y sus amigos" />
      </section>

      <section id="fotos" className="section photos-section">
        <div className="section-title">
          <Heart />
          <p>Fotos</p>
          <h2>Momentos de Denzel</h2>
        </div>
        <div className="photo-grid">
          {photoPlaceholders.map((label, index) => (
            <div className="photo-slot" key={label}>
              <Star />
              <strong>{label}</strong>
              <span>Placeholder {index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="ubicacion" className="section location-section">
        <div className="location-card">
          <MapPin />
          <p>Ubicación</p>
          <h2>{invitation.locationText}</h2>
          <span>Pasaje Caribe, Soyapango</span>
          <Button href={invitation.wazeUrl} target="_blank" rel="noopener">Abrir en Waze</Button>
        </div>
      </section>

      <section id="rsvp" className="section rsvp-section">
        <div className="rsvp-card">
          <img src="./assets/plim-logo.png" alt="Plim Plim" />
          <p>Te esperamos</p>
          <h2>¿Nos acompañas?</h2>
          <span>Confirma por WhatsApp al {invitation.rsvpPhoneDisplay}</span>
          <div className="rsvp-actions">
            <Button href={rsvpYes} icon={MessageCircle} target="_blank" rel="noopener">Confirmar asistencia por WhatsApp</Button>
            <Button href={rsvpNo} icon={MessageCircle} variant="light" target="_blank" rel="noopener">Confirmo que no podré asistir</Button>
            <Button href={calendarUrl} icon={CalendarDays} variant="outline" target="_blank" rel="noopener">Guardar fecha</Button>
            <Button href={shareUrl} icon={Share2} variant="outline" target="_blank" rel="noopener">Compartir invitación</Button>
          </div>
        </div>
      </section>

      <footer>Con cariño · Cumpleaños #1 de Denzel · {invitation.year}</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
