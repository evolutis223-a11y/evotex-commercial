// Cahier des Charges Client — formulaire interactif d'expression de besoins.
// Remplace le cahier des charges technique interne (jamais publié : exposerait
// la structure de l'ERP). Les réponses partent par e-mail vers l'équipe.
window.Views = window.Views || {};

(function () {
  const DEST_EMAIL = 'evolutis223@gmail.com';
  // Mêmes 8 Blocs Fonctionnels, mêmes intitulés que presentation.js et
  // socle-lancement.js -- règle d'unicité du vocabulaire (cadrage du
  // 14/09/2026) : un bloc nommé ainsi dans un document garde ce nom partout.
  const MODULES = [
    'Finance & Comptabilité',
    'Ressources Humaines',
    'EVOTEX Studio Dessin 1.0 & BAT',
    'Production & Maintenance Atelier',
    'Supply Chain & Logistique',
    'Commercial & Relation Client',
    'Pilotage & Gouvernance',
    'Administration & Sécurité du Système',
  ];

  let submitted = false;
  let nomContact = '';

  function rerender() {
    const root = document.getElementById('app');
    if (!root) return;
    root.innerHTML = Views.besoins.render();
    Views.besoins.mount(root);
  }

  Views.besoins = {
    title: 'EVOTEX 1.0 — Cahier des Charges Client',

    render() {
      if (submitted) {
        return `
          <div class="bes">
            <div class="bes-topbar"><button class="evx-retour" data-nav="#/">&#8592; Retour au hub</button></div>
            <div class="bes-card">
              <div class="bes-confirm">
                <div class="check-big">✓</div>
                <h3>Votre expression de besoin a bien été envoyée</h3>
                <p>Merci${nomContact ? ' ' + nomContact : ''}. Notre équipe l'étudie et revient vers vous avec une proposition adaptée sous 48h.</p>
                <button data-nav="#/">Retour au hub</button>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <div class="bes">
          <div class="bes-topbar"><button class="evx-retour" data-nav="#/">&#8592; Retour au hub</button></div>

          <div class="bes-head">
            <div class="bes-kicker">EVOTEX 1.0 — CAHIER DES CHARGES CLIENT</div>
            <h1 class="bes-h1">Décrivez votre projet</h1>
            <p class="bes-sub">Quelques minutes suffisent pour cadrer votre besoin — nous nous appuyons dessus pour préparer une proposition précise, adaptée à votre structure.</p>
          </div>

          <div class="bes-card">
            <form id="bes-form">
              <div class="bes-group">
                <div class="bes-group-title">Vos coordonnées</div>
                <div class="bes-form-row">
                  <div class="bes-field"><label for="bes-contact">Nom du contact</label><input id="bes-contact" name="contact" type="text"></div>
                  <div class="bes-field"><label for="bes-entreprise">Nom de l'entreprise</label><input id="bes-entreprise" name="entreprise" type="text"></div>
                </div>
                <div class="bes-form-row">
                  <div class="bes-field"><label for="bes-email">Email</label><input id="bes-email" name="email" type="email"></div>
                  <div class="bes-field"><label for="bes-tel">Téléphone</label><input id="bes-tel" name="telephone" type="tel" placeholder="Ex. +223 00 00 00 00"></div>
                </div>
                <div class="bes-form-row">
                  <div class="bes-field"><label for="bes-ville">Ville</label><input id="bes-ville" name="ville" type="text" placeholder="Ex. Bamako"></div>
                  <div class="bes-field"><label for="bes-pays">Pays</label><input id="bes-pays" name="pays" type="text" placeholder="Ex. Mali"></div>
                </div>
              </div>

              <div class="bes-group">
                <div class="bes-group-title">Périmètre du projet</div>
                <div class="bes-form-row">
                  <div class="bes-field"><label for="bes-nbutil">Nombre d'utilisateurs estimé</label><input id="bes-nbutil" name="nbUtilisateurs" type="text" placeholder="Ex. 15"></div>
                  <div class="bes-field"><label for="bes-nbsites">Nombre de sites</label><input id="bes-nbsites" name="nbSites" type="text" placeholder="Ex. 1"></div>
                </div>
                <div class="bes-field">
                  <label>Modules souhaités</label>
                  <div class="bes-modules-grid">
                    ${MODULES.map((m, i) => `
                      <label class="bes-module-check"><input type="checkbox" name="module" value="${m}" id="bes-mod-${i}">${m}</label>
                    `).join('')}
                  </div>
                  <div id="bes-autres-modules" class="bes-autres-modules">
                    <div class="bes-autre-module-row">
                      <input class="bes-autre-module" name="autreModule" type="text" placeholder="+ Un autre module en tête ? Précisez-le ici (facultatif)">
                    </div>
                  </div>
                  <button type="button" class="bes-ajouter-module" id="bes-ajouter-module">+ Ajouter un autre module</button>
                </div>
                <div class="bes-field"><label for="bes-budget">Budget indicatif <span class="hint">— facultatif, on peut aussi en discuter directement avec vous</span></label><input id="bes-budget" name="budget" type="text" placeholder="Ex. 50 000 000 F, ou laissez vide"></div>
                <div class="bes-field"><label for="bes-besoins">Besoins spécifiques</label><textarea id="bes-besoins" name="besoins" rows="5" placeholder="Décrivez votre activité, vos contraintes, vos attentes particulières…"></textarea></div>
              </div>

              <button class="bes-submit" type="submit">Envoyer mon expression de besoin</button>
            </form>
          </div>
        </div>
      `;
    },

    mount(root) {
      root.querySelectorAll('[data-nav]').forEach((el) => {
        el.addEventListener('click', () => { window.location.hash = el.getAttribute('data-nav'); });
      });

      const listeAutresModules = root.querySelector('#bes-autres-modules');
      const btnAjouterModule = root.querySelector('#bes-ajouter-module');
      if (btnAjouterModule && listeAutresModules) {
        btnAjouterModule.addEventListener('click', () => {
          const row = document.createElement('div');
          row.className = 'bes-autre-module-row';
          row.innerHTML = '<input class="bes-autre-module" name="autreModule" type="text" placeholder="+ Un autre module en tête ? Précisez-le ici (facultatif)">'
            + '<button type="button" class="bes-retirer-module" aria-label="Retirer ce module">&times;</button>';
          listeAutresModules.appendChild(row);
          row.querySelector('.bes-retirer-module').addEventListener('click', () => row.remove());
          row.querySelector('input').focus();
        });
      }

      const form = root.querySelector('#bes-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const f = new FormData(form);
          const contact = (f.get('contact') || '').toString();
          const modules = f.getAll('module');
          const autresModules = f.getAll('autreModule').map((v) => v.toString().trim()).filter(Boolean);
          const modulesTxt = modules.length ? modules.join(', ') + (autresModules.length ? ', ' + autresModules.join(', ') : '') : (autresModules.join(', ') || 'Non précisé');
          const body =
            `Entreprise: ${f.get('entreprise') || ''}%0D%0A` +
            `Contact: ${contact}%0D%0A` +
            `Email: ${f.get('email') || ''}%0D%0A` +
            `Téléphone: ${f.get('telephone') || ''}%0D%0A` +
            `Ville: ${f.get('ville') || ''}%0D%0A` +
            `Pays: ${f.get('pays') || ''}%0D%0A` +
            `Nombre d'utilisateurs estimé: ${f.get('nbUtilisateurs') || ''}%0D%0A` +
            `Nombre de sites: ${f.get('nbSites') || ''}%0D%0A` +
            `Modules souhaités: ${modulesTxt}%0D%0A` +
            `Budget estimé: ${f.get('budget') || ''}%0D%0A%0D%0A` +
            `Besoins spécifiques:%0D%0A${f.get('besoins') || ''}`;
          window.location.href = `mailto:${DEST_EMAIL}?subject=${encodeURIComponent('Cahier des charges client - ' + (f.get('entreprise') || 'Nouveau projet'))}&body=${body}`;
          nomContact = contact;
          submitted = true;
          rerender();
        });
      }
    },
  };
})();
