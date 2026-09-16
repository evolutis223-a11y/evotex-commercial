// Socle de Lancement — deck de 12 pages, format diaporama paysage.
// Réécriture du 14/09/2026 (cadrage stratégique validé par l'équipe projet) :
// toute la nomenclature est alignée sur l'architecture en 8 Blocs
// Fonctionnels + 2 Briques Transversales Propriétaires, vérifiée contre le
// code réel de app-web (voir l'audit du 14/09/2026). Un même intitulé garde
// le même sens dans ce fichier, dans presentation.js, dans besoins.js et
// dans hub.js -- règle d'unicité du vocabulaire.
window.Views = window.Views || {};

(function () {
  const STAGE_W = 1280;

  const PAGES = [
`<section class="page" id="licence-vente-totale" data-screen-label="01" style="background:#0e1b30;display:flex;flex-direction:column;box-sizing:border-box;padding:0;position:relative;overflow:hidden">
  <a href="#/licences" class="bx-b" style="position:absolute;top:46px;left:20px;z-index:3;display:inline-flex;align-items:center;gap:4px;background:rgba(10,20,36,0.55);border:1px solid rgba(255,255,255,0.25);color:#fff;font-size:15.5px;font-weight:700;letter-spacing:0.3px;padding:4px 9px;border-radius:999px;text-decoration:none">&#8592; Retour aux licences</a>
  <div class="bx-b" style="position:absolute;bottom:14px;right:20px;font-size:16px;font-weight:600;color:rgba(255,255,255,0.35);letter-spacing:1px;z-index:2">E223</div>

  <div style="flex:1;min-height:0;position:relative;overflow:hidden;background:#0a1424">
    <img src="/assets/img/tour-de-controle.png" alt="Tour de Contrôle EVOTEX 1.0" style="width:100%;height:100%;object-fit:cover;object-position:top center;filter:contrast(1.15) saturate(1.3)">
  </div>

  <div style="flex-shrink:0;background:#ffffff;padding:26px 6% 30px;position:relative">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:20.5px;color:#fff;flex-shrink:0">BX</div>
      <div style="display:flex;flex-direction:column">
        <span class="bx-b" style="font-size:21px;font-weight:800;color:#101828;letter-spacing:1px">BATEXCI ERP</span>
        <span class="bx-b" style="font-size:16.5px;font-weight:700;color:#2f6fb5;letter-spacing:1.5px">LICENCE 02 · EVOTEX 1.0</span>
      </div>
    </div>
    <div class="bx-h1" style="font-size:26px;font-weight:900;color:#101828;line-height:1.25;margin-top:16px;max-width:900px">Plateforme Unifiée de Pilotage Industrialisé, Suivi de Production Textile &amp; Gouvernance Financière</div>
  </div>
</section>`,

`<section class="page" data-screen-label="02" style="background:#0e1b30;display:flex;flex-direction:column;box-sizing:border-box;padding:3.2% 5%;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(1100px 700px at 100% -15%, rgba(63,127,196,0.4), transparent)"></div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;position:relative;z-index:1">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:700;color:#5fa0e0;letter-spacing:2px">BATEXCI ERP · ARCHITECTURE</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:600;color:#8a9bb8;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div style="position:relative;flex-shrink:0;margin-top:22px;z-index:1">
    <div style="display:flex;flex-shrink:0;width:88px;height:8px;margin-bottom:14px;border-radius:6px;overflow:hidden"><div style="flex:1;background:#009639"></div><div style="flex:1;background:#fcd116"></div><div style="flex:1;background:#ce1126"></div></div>
    <div class="bx-h1" style="font-size:34px;font-weight:900;color:#fff;line-height:1.15">8 Blocs Fonctionnels, une Seule Plateforme</div>
    <p class="bx-b" style="font-size:16.5px;font-weight:600;color:#c4d6ec;line-height:1.55;margin:14px 0 0;max-width:820px">Chaque grand domaine métier de l'usine forme un Bloc Fonctionnel — une nomenclature alignée sur les standards internationaux de l'ERP (Finance, RH, Manufacturing, Supply Chain, CRM, Business Intelligence), enrichie d'un module PLM textile pour le Studio Dessin.</p>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:26px;flex-shrink:0;position:relative;z-index:1">
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#1e3a5f;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">1</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Finance &amp; Comptabilité</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#1e3a5f;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">Financial Management</div>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#15803d;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">2</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Ressources Humaines</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#15803d;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">Human Capital Mgmt</div>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#7c3aed;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">3</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Studio Dessin 1.0 &amp; BAT</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#7c3aed;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">PLM Textile</div>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#c2751c;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">4</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Production &amp; Maintenance</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#c2751c;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">Manufacturing (MES)</div>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#0891b2;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">5</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Supply Chain &amp; Logistique</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#0891b2;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">Supply Chain Mgmt</div>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#2f6fb5;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">6</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Commercial &amp; Relation Client</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#2f6fb5;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">CRM</div>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#b45309;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">7</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Pilotage &amp; Gouvernance</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#b45309;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">Business Intelligence</div>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:18px 20px;box-shadow:0 6px 16px rgba(18,42,86,0.3), inset 0 1px 0 rgba(255,255,255,0.9)">
      <div style="width:36px;height:36px;border-radius:999px;background:#64748b;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16px;font-weight:900;color:#fff">8</span></div>
      <div class="bx-h3" style="font-size:18px;font-weight:800;color:#101828;margin-top:12px;line-height:1.25">Administration &amp; Sécurité</div>
      <div class="bx-b" style="font-size:11px;font-weight:800;color:#64748b;letter-spacing:1.2px;margin-top:5px;text-transform:uppercase">System Administration</div>
    </div>
  </div>

  <div style="margin-top:24px;flex-shrink:0;position:relative;z-index:1">
    <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:13.5px;letter-spacing:2px;margin-bottom:12px">+ 2 BRIQUES TRANSVERSALES PROPRIÉTAIRES</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div style="background:rgba(255,255,255,0.045);border:1px solid rgba(95,160,224,0.4);border-radius:12px;padding:16px 20px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:26px;height:26px;border-radius:7px;background:rgba(95,160,224,0.18);border:1px solid rgba(95,160,224,0.5);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span class="bx-b" style="font-size:12px;font-weight:900;color:#5fa0e0">1</span></div>
          <span class="bx-h3" style="font-size:17px;font-weight:800;color:#fff">Exclusivité des Motifs</span>
        </div>
        <div class="bx-b" style="font-size:12.5px;font-weight:800;color:#5fa0e0;letter-spacing:0.6px;margin-top:8px">COMMERCIAL ↔ STUDIO DESSIN</div>
        <div class="bx-b" style="font-size:14px;color:#c4d6ec;line-height:1.5;margin-top:6px">Protection d'un motif pour un client donné, gérée conjointement par les deux blocs.</div>
      </div>
      <div style="background:rgba(255,255,255,0.045);border:1px solid rgba(95,160,224,0.4);border-radius:12px;padding:16px 20px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:26px;height:26px;border-radius:7px;background:rgba(95,160,224,0.18);border:1px solid rgba(95,160,224,0.5);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span class="bx-b" style="font-size:12px;font-weight:900;color:#5fa0e0">2</span></div>
          <span class="bx-h3" style="font-size:17px;font-weight:800;color:#fff">Moteur de Validation &amp; Signature Multi-Postes</span>
        </div>
        <div class="bx-b" style="font-size:12.5px;font-weight:800;color:#5fa0e0;letter-spacing:0.6px;margin-top:8px">FINANCE ↔ STUDIO DESSIN ↔ PRODUCTION</div>
        <div class="bx-b" style="font-size:14px;color:#c4d6ec;line-height:1.5;margin-top:6px">Circuit de signatures séquentielles (jusqu'à 6 postes) intégré aux documents clés. Détail page 9.</div>
      </div>
    </div>
  </div>

  <div style="flex-shrink:0;margin-top:22px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.15);position:relative;z-index:1">
    <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:13px;letter-spacing:2px;margin-bottom:8px">MODULES NATIFS INCLUS DANS LE SOCLE</div>
    <div class="bx-b" style="font-size:13px;color:#a9bfdb;line-height:1.7">Connexion &amp; Authentification · Nouvelle Commande &amp; ODF · Suivi Production · Studio Dessin &amp; BAT · Registre Gravure · Vente Directe · Showroom · Produits &amp; Catalogue Usine · Clients · Actions Commerciales &amp; Agenda · Équipe Commerciale · Espace Production · Supervision Technique &amp; Parc Machines · Chef d'Équipe · Magasin &amp; Valorisation des Stocks · Inventaires · Achats &amp; Fournisseurs · Logistique &amp; Expéditions (Pass QR) · Gardien · Comptabilité · Caisse · DAF · Contrôle de Gestion · Accords Exceptionnels · Rapports · Tour de Contrôle Direction · Tableau de Bord · RH &amp; Personnel · Paramètres, Rôles &amp; Permissions · Support &amp; Aide Contextuelle</div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:12px;margin-top:18px;border-top:1px solid rgba(255,255,255,0.14);position:relative;z-index:1">
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#5fa0e0;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;color:#8a9bb8">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#5fa0e0;letter-spacing:1px">02 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="03" style="background:#0e1b30;display:flex;flex-direction:column;box-sizing:border-box;padding:4% 6%;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(1100px 700px at 100% -15%, rgba(63,127,196,0.4), transparent)"></div>
  <div class="bx-b" style="position:absolute;bottom:20px;right:28px;font-size:17px;font-weight:700;color:rgba(255,255,255,0.45);letter-spacing:1px;z-index:2">03 / 12</div>

  <div style="flex-shrink:0;position:relative;z-index:1">
    <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:16px;letter-spacing:2px;margin-bottom:6px">02 — VALEURS MÉTIER</div>
    <div class="bx-h1" style="font-size:27px;font-weight:900;color:#fff;line-height:1.2">Le Cœur de la Plateforme</div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;margin-top:9px;flex-shrink:0;position:relative;z-index:1">
    <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:10px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.28), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(18,42,86,0.08)">
      <div class="bx-h3" style="font-size:16.5px;font-weight:700;color:#101828;margin-bottom:6px">Pilotage d'Atelier en Temps Réel</div>
      <div class="bx-b" style="font-size:16.5px;color:#475467;line-height:1.4">Traçabilité intégrale des ODF et prise en compte directe des contraintes d'utilités pour réduire les goulots d'étranglement.</div>
    </div>
    <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:10px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.28), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(18,42,86,0.08)">
      <div class="bx-h3" style="font-size:16.5px;font-weight:700;color:#101828;margin-bottom:6px">Gouvernance &amp; Étanchéité Financière</div>
      <div class="bx-b" style="font-size:16.5px;color:#475467;line-height:1.4">Blocage automatique des lancements en fabrication et des sorties d'usine sans cadrage financier ou quitus comptable.</div>
    </div>
    <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:10px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.28), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(18,42,86,0.08)">
      <div class="bx-h3" style="font-size:16.5px;font-weight:700;color:#101828;margin-bottom:6px">BAT Zéro Défaut</div>
      <div class="bx-b" style="font-size:16.5px;color:#475467;line-height:1.4">Le Moteur de Validation &amp; Signature Multi-Postes structure et trace chaque étape avant gravure pour protéger la propriété intellectuelle des motifs.</div>
    </div>
    <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:10px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.28), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(18,42,86,0.08)">
      <div class="bx-h3" style="font-size:16.5px;font-weight:700;color:#101828;margin-bottom:6px">Transparence &amp; Sécurité des Données</div>
      <div class="bx-b" style="font-size:16.5px;color:#475467;line-height:1.4">Cloisonnement étanche des accès par rôles métiers natifs usine pour responsabiliser chaque intervenant.</div>
    </div>
  </div>

  <div style="margin-top:12px;flex:1;min-height:0;position:relative;z-index:1">
    <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:16px;letter-spacing:2px;margin-bottom:7px">LES 8 BLOCS FONCTIONNELS</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,minmax(0,1fr));gap:8px;height:100%">
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">1. Finance &amp; Comptabilité</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> Comptabilité, Caisse, DAF, Contrôle de Gestion.</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Cadrage financier étanche, de l'encaissement à la clôture.</div>
      </div>
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">2. Ressources Humaines</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> Annuaire du personnel en consultation, rôles et permissions de base.</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Chaque intervenant a un accès taillé à son métier — brique RH complémentaire, appelée à s'enrichir au-delà du Socle 1.</div>
      </div>
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">3. Studio Dessin 1.0 &amp; BAT</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> Motifs, gabarits, circuit BAT, Registre Gravure.</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Zéro défaut avant gravure, propriété intellectuelle protégée.</div>
      </div>
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">4. Production &amp; Maintenance</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> ODF, suivi poste par poste, supervision technique.</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Vision exacte du taux de saturation et des pannes.</div>
      </div>
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">5. Supply Chain &amp; Logistique</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> Magasin, stocks, inventaires, achats, expéditions.</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Étanchéité du magasin, traçabilité des flux sortants.</div>
      </div>
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">6. Commercial &amp; Relation Client</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> Commandes, clients, Showroom &amp; Vente Directe (comptoir, encaissement, inventaire de base).</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Visibilité directe sur tout le portefeuille commercial.</div>
      </div>
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">7. Pilotage &amp; Gouvernance</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> Tour de Contrôle Direction, tableaux de bord, rapports.</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Chiffre d'affaires, marge et alertes en un coup d'œil.</div>
      </div>
      <div style="background:#ffffff;border:1px solid #d7dee8;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 3px 8px rgba(18,42,86,0.24)">
        <div class="bx-h3" style="font-size:15.5px;font-weight:700;color:#101828;margin-bottom:4px">8. Administration &amp; Sécurité</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.3"><b>Inclus :</b> Paramètres, rôles &amp; permissions, gouvernance des dossiers.</div>
        <div class="bx-b" style="font-size:13px;color:#2f6fb5;line-height:1.3;margin-top:4px"><b>Résultat :</b> Sécurisation totale, responsabilité claire de chacun.</div>
      </div>
    </div>
  </div>
</section>`,

`<section class="page" id="licence-deploiement" data-screen-label="04" style="background:#0f172a;display:flex;flex-direction:column;box-sizing:border-box;padding:3.5% 5%;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(1200px 800px at 50% -10%, rgba(59,130,246,0.18), transparent)"></div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;position:relative;z-index:1">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:700;color:#5fa0e0;letter-spacing:2px">BATEXCI ERP · DÉPLOIEMENT</div>
    </div>
    <div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
      <a href="#/licences" class="bx-b" style="display:inline-flex;align-items:center;gap:6px;color:#8fb4de;font-size:17px;font-weight:700;letter-spacing:0.5px;text-decoration:none;white-space:nowrap">&#8592; Retour aux licences</a>
      <div class="bx-b" style="font-size:17px;font-weight:600;color:#8a9bb8;letter-spacing:1.5px;white-space:nowrap">LICENCE 01 · EVOTEX 1.0</div>
    </div>
  </div>

  <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:28px;flex-shrink:0;position:relative;z-index:1;margin-top:14px">
    <div>
      <div class="bx-h1" style="font-size:33px;font-weight:900;color:#fff;line-height:1.18;letter-spacing:0.5px">SOCLE OPÉRATIONNEL<br>AJUSTEMENT TERRAIN</div>
      <div style="display:flex;align-items:center;gap:14px;margin-top:16px">
        <span class="bx-b" style="font-size:19.5px;font-weight:700;color:#8fb4de;letter-spacing:2px">PHASE 1 · MOIS 1-2</span>
        <div style="background:#2f6fb5;border-radius:999px;padding:9px 20px;white-space:nowrap">
          <span class="bx-h1" style="font-size:21.5px;font-weight:900;color:#fff;letter-spacing:0.5px">80% DÉPLOYÉ</span>
        </div>
      </div>
      <div class="bx-b" style="font-size:16.5px;font-weight:600;color:#7f96b8;letter-spacing:0.5px;margin-top:6px">Les 8 Blocs du Socle 1 prêts et testés, à l'issue du Mois 2</div>
    </div>

    <div style="display:flex;flex-direction:column;gap:2px;flex-shrink:0;align-items:flex-end;text-align:right;max-width:340px">
      <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;justify-content:flex-end">
        <span class="bx-b" style="font-size:19.5px;font-weight:700;color:#8fb4de;letter-spacing:1.5px">DÈS LE</span>
        <span class="bx-h1" style="font-size:47.5px;font-weight:900;color:#5fa0e0;line-height:0.95">MOIS 2</span>
      </div>
      <span class="bx-b" style="font-size:17.5px;font-weight:700;color:#cbd5e1;letter-spacing:1px">APPLICATION DÉJÀ OPÉRATIONNELLE</span>
      <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;justify-content:flex-end;margin-top:10px">
        <span class="bx-h1" style="font-size:47.5px;font-weight:900;color:#fff;line-height:0.95">100%</span>
        <span class="bx-b" style="font-size:19.5px;font-weight:700;color:#8fb4de;letter-spacing:1.5px">EN 6 MOIS</span>
      </div>
      <span class="bx-b" style="font-size:17.5px;font-weight:700;color:#cbd5e1;letter-spacing:1px">TRAJECTOIRE DE FINALISATION COMPLÈTE</span>
    </div>
  </div>

  <div style="flex:1;display:flex;flex-direction:column;gap:14px;margin-top:18px;min-height:0;position:relative;z-index:1">

    <div style="flex:1;display:grid;grid-template-columns:1.3fr 1fr;gap:16px;min-height:0">

      <div style="display:flex;flex-direction:column;gap:14px;min-height:0">
        <div style="background:#1e293b;border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px 20px;flex-shrink:0">
          <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:17px;letter-spacing:2px;margin-bottom:6px">MOIS 1 · ÉTUDES TERRAIN &amp; AJUSTEMENT DU CAHIER DES CHARGES</div>
          <span class="bx-b" style="font-size:18px;font-weight:600;color:#f1f5f9;line-height:1.5">Missions d'observation sur le terrain dans chaque département usine. Ajustement fin des règles de gestion aux réalités opérationnelles de BATEX-CI avant ouverture des accès usine.</span>
        </div>

        <div style="background:#1e293b;border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:16px 20px;min-width:0;flex:1;display:flex;flex-direction:column;justify-content:center">
          <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:16.5px;letter-spacing:1.5px;margin-bottom:12px">MATURITÉ DES 8 BLOCS DU SOCLE</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">1. Finance &amp; Comptabilité</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">2. Ressources Humaines</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">3. Studio Dessin 1.0 &amp; BAT</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">4. Production &amp; Maintenance</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">5. Supply Chain &amp; Logistique</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">6. Commercial &amp; Relation Client</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">7. Pilotage &amp; Gouvernance</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
            <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span class="bx-b" style="font-size:15.5px;font-weight:600;color:#cbd5e1">8. Administration &amp; Sécurité</span><span class="bx-b" style="font-size:11.5px;font-weight:700;color:#5fa0e0;background:rgba(95,160,224,0.15);border:1px solid rgba(95,160,224,0.4);border-radius:999px;padding:3px 10px;white-space:nowrap">Socle actif</span></div>
          </div>
          <div class="bx-b" style="font-size:13px;color:#8fb4de;line-height:1.4;margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.12)">+ Avances Opérationnelles — 100% opérationnelles sur leur périmètre Usine : Registre Gravure, Showroom &amp; Vente Directe, Gouvernance des Dossiers, Tableaux de bord personnalisables.</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;justify-content:center;min-height:0;padding:4px 10px">
        <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:16.5px;letter-spacing:1.5px;margin-bottom:16px">ROADMAP DE DÉPLOIEMENT — 6 MOIS</div>
        <div style="display:flex;flex-direction:column">
          <div style="display:flex;gap:14px">
            <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
              <div style="width:16px;height:16px;border-radius:50%;background:#5fa0e0;display:flex;align-items:center;justify-content:center"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0e1b30" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <div style="width:2px;flex:1;background:#5fa0e0;margin:2px 0"></div>
            </div>
            <div style="padding-bottom:22px">
              <div class="bx-h3" style="font-size:18px;font-weight:700;color:#fff;line-height:1.3">MOIS 1<br>Ajustement terrain</div>
              <div class="bx-b" style="font-size:16.5px;color:#8fb4de;margin-top:3px">Terminé</div>
            </div>
          </div>
          <div style="display:flex;gap:14px">
            <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
              <div style="width:18px;height:18px;border-radius:50%;background:#5fa0e0;border:3px solid rgba(95,160,224,0.35)"></div>
              <div style="width:2px;flex:1;background:rgba(255,255,255,0.18);margin:2px 0"></div>
            </div>
            <div style="padding-bottom:22px">
              <div class="bx-h3" style="font-size:18px;font-weight:700;color:#fff;line-height:1.3">MOIS 2<br>Socle Opérationnel</div>
              <div class="bx-b" style="font-size:16.5px;color:#5fa0e0;margin-top:3px;font-weight:700">Modules du Socle 1 prêts et testés · 80%</div>
            </div>
          </div>
          <div style="display:flex;gap:14px">
            <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
              <div style="width:16px;height:16px;border-radius:50%;background:transparent;border:2px solid rgba(255,255,255,0.3)"></div>
              <div style="width:2px;flex:1;background:rgba(255,255,255,0.18);margin:2px 0"></div>
            </div>
            <div style="padding-bottom:22px">
              <div class="bx-h3" style="font-size:20.5px;font-weight:700;color:#dbe4f0;line-height:1.3">MOIS 3-4<br>Consolidation</div>
              <div class="bx-b" style="font-size:18.5px;color:#a9bbd4;margin-top:3px;line-height:1.4">Stabilisation terrain — cible 87%, transition progressive, sans rupture des processus en place</div>
            </div>
          </div>
          <div style="display:flex;gap:14px">
            <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
              <div style="width:16px;height:16px;border-radius:50%;background:transparent;border:2px solid rgba(255,255,255,0.3)"></div>
            </div>
            <div>
              <div class="bx-h3" style="font-size:20.5px;font-weight:700;color:#dbe4f0;line-height:1.3">MOIS 5-6<br>Livraison complète</div>
              <div class="bx-b" style="font-size:18.5px;color:#a9bbd4;margin-top:3px;line-height:1.4">Cible 100% du Socle 1, et bascule des Avances Opérationnelles vers des modules dédiés</div>
            </div>
          </div>
        </div>
        <div class="bx-b" style="font-size:18px;color:#a9bfdb;line-height:1.5;margin-top:6px;max-width:340px">Un accompagnement continu de 6 mois : la transition se fait en douceur, sans bousculer les processus déjà en place, avec un ajustement progressif des derniers réglages.</div>
      </div>

    </div>

    <div style="background:#1e293b;border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px 22px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-shrink:0;flex-wrap:wrap">
      <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:16.5px;letter-spacing:1.5px;flex-shrink:0">PRÉREQUIS INDISPENSABLES</div>
      <div style="display:flex;align-items:center;gap:8px">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5fa0e0" stroke-width="2" stroke-linecap="round" style="flex-shrink:0"><path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16a6.5 6.5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="#5fa0e0" stroke="none"/></svg>
        <span class="bx-b" style="font-size:18.5px;color:#e2e8f0">Connexion Internet stable</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5fa0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>
        <span class="bx-b" style="font-size:18.5px;color:#e2e8f0">Postes informatiques usine (PC prioritaire)</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5fa0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M2 8l10-4 10 4-10 4-10-4z"/><path d="M6 10v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg>
        <span class="bx-b" style="font-size:18.5px;color:#e2e8f0">Formation des équipes (dès Mois 2)</span>
      </div>
    </div>

  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:10px;margin-top:16px;border-top:1px solid rgba(255,255,255,0.14);position:relative;z-index:1">
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#5fa0e0;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;color:#8a9bb8">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#5fa0e0;letter-spacing:1px">04 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="05" style="background:#fff;display:flex;flex-direction:column;box-sizing:border-box;padding:3.5% 5%;position:relative;overflow:hidden">

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:700;color:#2f6fb5;letter-spacing:2px">BATEXCI ERP · DÉPLOIEMENT</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:600;color:#93a1b3;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:16px;flex-shrink:0">
    <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:18.5px;letter-spacing:2px">PHASE 1 · MOIS 1-2</div>
    <div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
      <div style="width:120px;height:8px;background:#c3d0e3;border-radius:4px"><div style="width:80%;height:100%;background:#2f6fb5;border-radius:4px"></div></div>
      <span class="bx-h1" style="font-size:47.5px;font-weight:900;color:#2f6fb5;line-height:0.95">80%</span>
    </div>
  </div>
  <div class="bx-h1" style="font-size:24px;font-weight:900;color:#101828;line-height:1.2;margin-top:6px">Détail du Socle Opérationnel</div>

  <div style="display:grid;grid-template-columns:150px 45px 1fr;gap:14px;align-items:start;padding:10px 0;margin-top:12px;border-bottom:2px solid #2f6fb5;flex-shrink:0">
    <span class="bx-b" style="font-size:19.5px;font-weight:800;letter-spacing:2px;color:#2f6fb5">MOIS 1</span>
    <span></span>
    <div>
      <div class="bx-h3" style="font-size:18.5px;font-weight:700;color:#101828;margin-bottom:3px">Ajustement du cahier des charges</div>
      <span class="bx-b" style="font-size:19px;color:#3d4a5c;line-height:1.4">Études terrain et missions dans les différents départements pour ajuster l'application aux réalités du flux de travail et aux choix spécifiques du client, en préparation du déploiement.</span>
    </div>
  </div>

  <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:18px;letter-spacing:2px;margin-top:12px;flex-shrink:0">MOIS 2 · LES 8 BLOCS DU SOCLE</div>

  <div style="flex:1;display:grid;grid-template-columns:1fr 25%;gap:20px;margin-top:10px;min-height:0">

    <div style="display:flex;flex-direction:column;justify-content:center;gap:0px;min-height:0;min-width:0">
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0;border-bottom:1px solid #d7dee8">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">1. Finance &amp; Comptabilité</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Comptabilité, Caisse, DAF, Contrôle de Gestion (consultation).</span>
      </div>
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0;border-bottom:1px solid #d7dee8">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">2. Ressources Humaines</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Annuaire du personnel en consultation, accès cloisonnés par rôle métier — brique évolutive au-delà du Socle 1.</span>
      </div>
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0;border-bottom:1px solid #d7dee8">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">3. Studio Dessin 1.0 &amp; BAT</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Motifs, création graphique, circuit BAT, Registre Gravure inclus.</span>
      </div>
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0;border-bottom:1px solid #d7dee8">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">4. Production &amp; Maintenance</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Traçabilité temps réel des ODF, supervision technique des utilités.</span>
      </div>
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0;border-bottom:1px solid #d7dee8">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">5. Supply Chain &amp; Logistique</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Magasin, valorisation de stock, inventaires, achats, expéditions.</span>
      </div>
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0;border-bottom:1px solid #d7dee8">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">6. Commercial &amp; Relation Client</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Prise de commande, clients, Showroom &amp; Vente Directe (comptoir, encaissement, inventaire de base).</span>
      </div>
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0;border-bottom:1px solid #d7dee8">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">7. Pilotage &amp; Gouvernance</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Tour de Contrôle Direction, tableaux de bord personnalisables.</span>
      </div>
      <div style="display:grid;grid-template-columns:230px 110px 1fr;gap:14px;align-items:center;padding:6px 0">
        <span class="bx-h3" style="font-size:17.5px;font-weight:700;color:#101828;line-height:1.25">8. Administration &amp; Sécurité</span>
        <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#2f6fb5;background:rgba(47,111,181,0.1);border:1px solid rgba(47,111,181,0.35);border-radius:999px;padding:4px 10px;white-space:nowrap;text-align:center">Socle actif</span>
        <span class="bx-b" style="font-size:18px;color:#4b5565;line-height:1.4">Paramètres, rôles &amp; permissions, gouvernance des dossiers.</span>
      </div>
    </div>

    <div style="background:#0e1b30;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:center;min-width:0;box-sizing:border-box;box-shadow:0 4px 14px rgba(18,42,86,0.3)">
      <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:17px;letter-spacing:1.5px;margin-bottom:12px">DÉJÀ OPÉRATIONNEL</div>
      <span class="bx-b" style="font-size:17.5px;font-weight:500;color:#f1f5f9;line-height:1.55;overflow-wrap:break-word">Le socle garantit l'exploitation immédiate des flux vitaux usine dès le Mois 2 : validation technique/visuelle des BAT, suivi en temps réel des ODF, gestion du magasin, Showroom &amp; Vente Directe opérationnels sur l'essentiel (comptoir, encaissement), et émission des Pass QR de sortie d'usine.</span>
      <span class="bx-b" style="font-size:17.5px;font-weight:500;color:#c4d6ec;line-height:1.55;margin-top:12px;overflow-wrap:break-word">100% opérationnels sur le périmètre Usine dès la Phase 1 : le Registre Gravure (suivi des cadres et cylindres par motif, couleur et version) et la Gouvernance des Dossiers (réattribution, réouverture tracée).</span>
    </div>

  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:10px;margin-top:14px;border-top:1px solid #d7dee8">
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#2f6fb5;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;color:#93a1b3">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#2f6fb5;letter-spacing:1px">05 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="06" style="background:#fff;display:flex;flex-direction:column;box-sizing:border-box;padding:3.5% 5%;position:relative;overflow:hidden">

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:700;color:#2f6fb5;letter-spacing:2px">BATEXCI ERP · DÉPLOIEMENT</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:600;color:#93a1b3;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-shrink:0;margin-top:14px">
    <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:18.5px;letter-spacing:2px">PHASES 2 &amp; 3 · MOIS 3-6</div>
    <div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
      <div style="width:120px;height:8px;background:#c3d0e3;border-radius:4px"><div style="width:87%;height:100%;background:#2f6fb5;border-radius:4px"></div></div>
      <span class="bx-h1" style="font-size:47.5px;font-weight:900;color:#2f6fb5;line-height:0.95">87%</span>
    </div>
  </div>
  <div class="bx-h1" style="font-size:24px;font-weight:900;color:#101828;line-height:1.2;margin-top:6px">Trajectoire de Finalisation</div>

  <div style="display:grid;grid-template-columns:150px 60px 1fr;gap:16px;align-items:start;padding:10px 0;margin-top:12px;border-bottom:2px solid #2f6fb5;flex-shrink:0">
    <span class="bx-b" style="font-size:19.5px;font-weight:800;letter-spacing:2px;color:#2f6fb5">MOIS 3-4</span>
    <span></span>
    <div>
      <div class="bx-h3" style="font-size:18.5px;font-weight:700;color:#101828">Consolidation &amp; Industrialisation</div>
      <span class="bx-b" style="font-size:20.5px;color:#334155;line-height:1.5">Transition progressive et continue, sans rupture des processus déjà en place : ajustement des derniers réglages en accompagnant les équipes — cible 87% sur les 8 Blocs.</span>
    </div>
  </div>

  <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:18px;letter-spacing:2px;margin-top:12px;flex-shrink:0">MOIS 5-6 · COUVERTURE TOTALE (100%)</div>

  <div style="display:flex;flex-direction:column;gap:16px;margin-top:12px;min-height:0;flex:1">

    <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:8px;flex-shrink:0">
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#1e3a5f;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">1</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Finance &amp; Comptabilité</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#15803d;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">2</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Ressources Humaines</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#7c3aed;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">3</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Studio Dessin 1.0 &amp; BAT</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#c2751c;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">4</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Production &amp; Maintenance</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#0891b2;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">5</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Supply Chain &amp; Logistique</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#2f6fb5;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">6</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Commercial &amp; Relation Client</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#b45309;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">7</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Pilotage &amp; Gouvernance</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
      <div style="background:#eef1f6;border-radius:9px;padding:9px 8px;text-align:center"><div style="width:22px;height:22px;border-radius:999px;background:#64748b;margin:0 auto 6px;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:11px;font-weight:900;color:#fff">8</span></div><div class="bx-h3" style="font-size:11.5px;font-weight:700;color:#101828;line-height:1.25;min-height:28px">Administration &amp; Sécurité</div><div class="bx-b" style="font-size:13px;color:#2f6fb5;font-weight:900;margin-top:4px">100%</div></div>
    </div>

    <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:20px;flex:1;min-height:0">

      <div style="background:#f8fafc;border:1px solid #d7dee8;border-radius:14px;padding:16px 20px;display:flex;flex-direction:column;min-width:0">
        <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:15px;letter-spacing:1.5px;margin-bottom:6px">TRAJECTOIRE DE MATURITÉ DU SOCLE</div>
        <svg viewBox="0 0 460 190" style="width:100%;height:auto;flex:1;min-height:0">
          <line x1="30" y1="165" x2="440" y2="165" stroke="#d7dee8" stroke-width="1.5"/>
          <path d="M70,175 L70,140 L245,97 L410,42 L410,175 Z" fill="rgba(47,111,181,0.12)"/>
          <path d="M70,140 L245,97 L410,42" fill="none" stroke="#2f6fb5" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="70" cy="140" r="6" fill="#2f6fb5" stroke="#fff" stroke-width="2"/>
          <circle cx="245" cy="97" r="6" fill="#2f6fb5" stroke="#fff" stroke-width="2"/>
          <circle cx="410" cy="42" r="6" fill="#2f6fb5" stroke="#fff" stroke-width="2"/>
          <text x="70" y="122" text-anchor="middle" font-size="17" font-weight="900" fill="#2f6fb5" font-family="Sora, sans-serif">80%</text>
          <text x="245" y="79" text-anchor="middle" font-size="17" font-weight="900" fill="#2f6fb5" font-family="Sora, sans-serif">87%</text>
          <text x="410" y="24" text-anchor="middle" font-size="17" font-weight="900" fill="#2f6fb5" font-family="Sora, sans-serif">100%</text>
          <text x="70" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="#64748b" letter-spacing="0.5" font-family="Sora, sans-serif">MOIS 2</text>
          <text x="245" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="#64748b" letter-spacing="0.5" font-family="Sora, sans-serif">MOIS 3-4</text>
          <text x="410" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="#64748b" letter-spacing="0.5" font-family="Sora, sans-serif">MOIS 5-6</text>
        </svg>
      </div>

      <div style="background:#0e1b30;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:center;min-width:0;box-sizing:border-box;box-shadow:0 4px 14px rgba(18,42,86,0.3)">
        <div class="bx-h1" style="color:#fff;font-weight:900;font-size:36px;line-height:1.1;letter-spacing:0.2px;margin-bottom:16px">Trajectoire <span style="color:#5fa0e0">complète</span></div>
        <span class="bx-b" style="font-size:19px;font-weight:600;color:#f1f5f9;line-height:1.45;overflow-wrap:break-word">À l'issue du Mois 6, l'ensemble des flux usine est piloté, tracé et sécurisé sur une seule plateforme, en 8 Blocs Fonctionnels.</span>
        <span class="bx-b" style="font-size:16px;font-weight:500;color:#c4d6ec;line-height:1.45;margin-top:12px;overflow-wrap:break-word">Un accompagnement continu jusqu'à la couverture totale, sans rupture des habitudes de travail déjà en place.</span>
      </div>

    </div>

  </div>

  <div style="background:#eaf3ff;margin-left:calc(-5% / 0.9);margin-right:calc(-5% / 0.9);padding:14px calc(5% / 0.9);border-top:2px solid #2f6fb5;border-bottom:2px solid #2f6fb5;flex-shrink:0;position:relative;z-index:1;margin-top:-2px">
    <div class="bx-b" style="color:#2f6fb5;font-weight:900;font-size:18.5px;letter-spacing:1.5px;margin-bottom:10px">MODULES AVANCÉS / PHASE 2 — EXTENSIONS HORS SOCLE</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
      <div style="background:#fff;border-radius:9px;padding:9px 12px">
        <div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.8px;margin-bottom:3px">BLOC 1</div>
        <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#0f172a;line-height:1.25">Connecteur SYSCOHADA/SAGE</div>
        <div class="bx-b" style="font-size:12.5px;color:#475467;line-height:1.35;margin-top:3px">Export automatisé vers un logiciel comptable tiers.</div>
      </div>
      <div style="background:#fff;border-radius:9px;padding:9px 12px">
        <div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.8px;margin-bottom:3px">BLOC 2</div>
        <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#0f172a;line-height:1.25">Paie &amp; Pointage Avancé</div>
        <div class="bx-b" style="font-size:12.5px;color:#475467;line-height:1.35;margin-top:3px">Non couverts.</div>
      </div>
      <div style="background:#fff;border-radius:9px;padding:9px 12px">
        <div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.8px;margin-bottom:3px">BLOC 3</div>
        <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#0f172a;line-height:1.25">Séparation des Couleurs</div>
        <div class="bx-b" style="font-size:12.5px;color:#475467;line-height:1.35;margin-top:3px">Outil de prépresse numérique.</div>
      </div>
      <div style="background:#fff;border-radius:9px;padding:9px 12px">
        <div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.8px;margin-bottom:3px">BLOC 4</div>
        <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#0f172a;line-height:1.25">Filature &amp; Transformation, Connecteurs IoT</div>
        <div class="bx-b" style="font-size:12.5px;color:#475467;line-height:1.35;margin-top:3px">Non couverts.</div>
      </div>
      <div style="background:#fff;border-radius:9px;padding:9px 12px">
        <div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.8px;margin-bottom:3px">BLOC 5</div>
        <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#0f172a;line-height:1.25">Stocks Matières Premières Avancé</div>
        <div class="bx-b" style="font-size:12.5px;color:#475467;line-height:1.35;margin-top:3px">Achats et approvisionnement non inclus.</div>
      </div>
      <div style="background:#fff;border-radius:9px;padding:9px 12px">
        <div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.8px;margin-bottom:3px">BLOC 6</div>
        <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#0f172a;line-height:1.25">Portails Vente en Ligne &amp; Marketing</div>
        <div class="bx-b" style="font-size:12.5px;color:#475467;line-height:1.35;margin-top:3px">Non couverts.</div>
      </div>
      <div style="background:#fff;border-radius:9px;padding:9px 12px">
        <div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.8px;margin-bottom:3px">BLOC 8</div>
        <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#0f172a;line-height:1.25">Notifications &amp; Alertes SMS</div>
        <div class="bx-b" style="font-size:12.5px;color:#475467;line-height:1.35;margin-top:3px">Non couvertes.</div>
      </div>
    </div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:10px;margin-top:10px">
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#2f6fb5;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;color:#93a1b3">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#2f6fb5;letter-spacing:1px">06 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="07" style="background:#fff;display:flex;flex-direction:column;box-sizing:border-box;padding:3.2% 5%;position:relative;overflow:hidden">

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:700;color:#2f6fb5;letter-spacing:2px">BATEXCI ERP · CATALOGUE</div>
    </div>
    <div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
      <a href="#/licences" class="bx-b" style="display:inline-flex;align-items:center;gap:6px;color:#2f6fb5;font-size:17px;font-weight:700;letter-spacing:0.5px;text-decoration:none;white-space:nowrap">&#8592; Retour aux licences</a>
      <div class="bx-b" style="font-size:17px;font-weight:600;color:#93a1b3;letter-spacing:1.5px;white-space:nowrap">LICENCE 03 · EVOTEX 1.0</div>
    </div>
  </div>

  <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:17px;letter-spacing:2px;margin-top:12px">CATALOGUE — SOCLE 1 / AVANCE OPÉRATIONNELLE / PHASE 2</div>
  <div class="bx-h1" id="licence-saas" style="font-size:22px;font-weight:900;color:#101828;line-height:1.2;margin-top:4px">3 Niveaux, 8 Blocs, 2 Briques Transversales</div>

  <div style="margin-top:10px">
    <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:15.5px;letter-spacing:1.5px">1 · SOCLE DE LANCEMENT — PÉRIMÈTRE CONTRACTUEL</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px">
      <div style="background:#fff;border-left:4px solid #1e3a5f;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#1e3a5f;letter-spacing:0.6px;margin-bottom:2px">BLOC 1</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Comptabilité, Caisse, DAF</span></div>
      <div style="background:#fff;border-left:4px solid #1e3a5f;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#1e3a5f;letter-spacing:0.6px;margin-bottom:2px">BLOC 1</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Contrôle de Gestion</span></div>
      <div style="background:#fff;border-left:4px solid #1e3a5f;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#1e3a5f;letter-spacing:0.6px;margin-bottom:2px">BLOC 1</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Accords Exceptionnels</span></div>
      <div style="background:#fff;border-left:4px solid #15803d;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#15803d;letter-spacing:0.6px;margin-bottom:2px">BLOC 2</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">RH &amp; Personnel</span></div>
      <div style="background:#fff;border-left:4px solid #7c3aed;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#7c3aed;letter-spacing:0.6px;margin-bottom:2px">BLOC 3</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Studio Dessin, Circuit BAT</span></div>
      <div style="background:#fff;border-left:4px solid #c2751c;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#c2751c;letter-spacing:0.6px;margin-bottom:2px">BLOC 4</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">ODF &amp; Suivi Production</span></div>
      <div style="background:#fff;border-left:4px solid #c2751c;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#c2751c;letter-spacing:0.6px;margin-bottom:2px">BLOC 4</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Supervision Technique</span></div>
      <div style="background:#fff;border-left:4px solid #0891b2;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#0891b2;letter-spacing:0.6px;margin-bottom:2px">BLOC 5</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Magasin &amp; Valorisation Stock</span></div>
      <div style="background:#fff;border-left:4px solid #0891b2;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#0891b2;letter-spacing:0.6px;margin-bottom:2px">BLOC 5</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Inventaires &amp; Achats</span></div>
      <div style="background:#fff;border-left:4px solid #0891b2;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#0891b2;letter-spacing:0.6px;margin-bottom:2px">BLOC 5</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Expéditions &amp; Pass QR</span></div>
      <div style="background:#fff;border-left:4px solid #2f6fb5;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.6px;margin-bottom:2px">BLOC 6</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Nouvelle Commande &amp; Clients</span></div>
      <div style="background:#fff;border-left:4px solid #2f6fb5;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#2f6fb5;letter-spacing:0.6px;margin-bottom:2px">BLOC 6</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Actions Commerciales &amp; Agenda</span></div>
      <div style="background:#fff;border-left:4px solid #b45309;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#b45309;letter-spacing:0.6px;margin-bottom:2px">BLOC 7</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Tour de Contrôle Direction</span></div>
      <div style="background:#fff;border-left:4px solid #b45309;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#b45309;letter-spacing:0.6px;margin-bottom:2px">BLOC 7</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Tableau de Bord</span></div>
      <div style="background:#fff;border-left:4px solid #b45309;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#b45309;letter-spacing:0.6px;margin-bottom:2px">BLOC 7</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Rapports</span></div>
      <div style="background:#fff;border-left:4px solid #64748b;border-radius:0 8px 8px 0;padding:8px 12px;box-shadow:0 2px 6px rgba(18,42,86,0.12)"><div class="bx-b" style="font-size:10px;font-weight:800;color:#64748b;letter-spacing:0.6px;margin-bottom:2px">BLOC 8</div><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#101828">Paramètres &amp; Rôles</span></div>
    </div>
  </div>

  <div style="background:#0e1b30;margin-left:calc(5% / 0.94);margin-right:calc(-5% / 0.94);margin-left:calc(-5% / 0.94);padding:12px calc(5% / 0.94);border-radius:16px;margin-top:12px;box-sizing:border-box">
    <div class="bx-b" style="color:#2dd4bf;font-weight:900;font-size:15.5px;letter-spacing:1.5px">2 · AVANCE OPÉRATIONNELLE — BONUS OFFERT DÈS LA PHASE 1</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px">
      <div style="border:1px solid rgba(45,212,191,0.4);border-radius:7px;padding:7px 10px;background:rgba(45,212,191,0.08)"><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#2dd4bf">Registre Gravure</span><div class="bx-b" style="font-size:13px;color:#c4d6ec;line-height:1.3;margin-top:3px">Cadres/cylindres suivis par motif, couleur, version. Évolue vers la Séparation des Couleurs en Phase 2.</div></div>
      <div style="border:1px solid rgba(45,212,191,0.4);border-radius:7px;padding:7px 10px;background:rgba(45,212,191,0.08)"><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#2dd4bf">Showroom &amp; Vente Directe</span><div class="bx-b" style="font-size:13px;color:#c4d6ec;line-height:1.3;margin-top:3px">Encaissement comptoir/boutique — 100% opérationnel sur le circuit de vente et d'encaissement.</div></div>
      <div style="border:1px solid rgba(45,212,191,0.4);border-radius:7px;padding:7px 10px;background:rgba(45,212,191,0.08)"><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#2dd4bf">Gouvernance des Dossiers</span><div class="bx-b" style="font-size:13px;color:#c4d6ec;line-height:1.3;margin-top:3px">Réattribution de commercial et réouverture archivée, motif tracé.</div></div>
      <div style="border:1px solid rgba(45,212,191,0.4);border-radius:7px;padding:7px 10px;background:rgba(45,212,191,0.08)"><span class="bx-h3" style="font-size:14.5px;font-weight:700;color:#2dd4bf">Tableaux de Bord Personnalisables</span><div class="bx-b" style="font-size:13px;color:#c4d6ec;line-height:1.3;margin-top:3px">Widgets réorganisables par glisser-déposer.</div></div>
    </div>
    <div class="bx-b" style="font-size:12px;color:#8fb4de;line-height:1.4;margin-top:8px">Le client est informé que ces briques évolueront, selon les cas, vers des modules dédiés en Phase 2.</div>
  </div>

  <div style="margin-top:12px">
    <div class="bx-b" style="color:#b45309;font-weight:900;font-size:15.5px;letter-spacing:1.5px">3 · MODULES AVANCÉS / PHASE 2 — EXTENSIONS HORS SOCLE</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px">
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Connecteur SYSCOHADA/SAGE</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Paie &amp; Pointage Avancé</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Séparation des Couleurs</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Filature &amp; Transformation</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Connecteurs IoT Machines</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Stocks Matières Premières Avancé</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Portails Vente en Ligne &amp; Marketing</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Notifications &amp; Alertes SMS</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Sécurité &amp; Sortie Avancée (visiteurs)</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Magasin Avancé Pièces &amp; Outillage</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Écrans Postes</span></div>
      <div style="border:1px solid rgba(180,83,9,0.35);border-radius:7px;padding:7px 10px;background:rgba(180,83,9,0.06)"><span class="bx-h3" style="font-size:14px;font-weight:700;color:#b45309">Matrice de Décision d'Urgence</span><div class="bx-b" style="font-size:11.5px;color:#92642c;line-height:1.25;margin-top:2px">Maquette conceptuelle &amp; vision BI — intégration dynamique en Phase 2.</div></div>
    </div>
  </div>

  <div style="margin-top:12px;background:rgba(95,160,224,0.08);border:1px solid rgba(95,160,224,0.3);border-radius:12px;padding:12px 18px">
    <div class="bx-b" style="color:#2f6fb5;font-weight:900;font-size:14.5px;letter-spacing:1.2px;margin-bottom:8px">2 BRIQUES TRANSVERSALES PROPRIÉTAIRES — INCLUSES AU SOCLE</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div>
        <span class="bx-h3" style="font-size:15px;font-weight:800;color:#101828">Exclusivité des Motifs</span>
        <div class="bx-b" style="font-size:11.5px;color:#2f6fb5;font-weight:800;letter-spacing:0.5px;margin-top:3px;text-transform:uppercase">Commercial ↔ Studio Dessin</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.35;margin-top:4px">Protection d'un motif pour un client donné, gérée conjointement.</div>
      </div>
      <div>
        <span class="bx-h3" style="font-size:15px;font-weight:800;color:#101828">Moteur de Validation &amp; Signature Multi-Postes</span>
        <div class="bx-b" style="font-size:11.5px;color:#2f6fb5;font-weight:800;letter-spacing:0.5px;margin-top:3px;text-transform:uppercase">Finance ↔ Studio Dessin ↔ Production</div>
        <div class="bx-b" style="font-size:13px;color:#475467;line-height:1.35;margin-top:4px">Circuit de signatures séquentielles (jusqu'à 6 postes) sur les documents clés.</div>
      </div>
    </div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:8px;margin-top:8px">
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#2f6fb5;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;color:#93a1b3">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#2f6fb5;letter-spacing:1px">07 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="08" style="background:#fff;display:flex;flex-direction:column;box-sizing:border-box;padding:3.5% 5%;position:relative;overflow:hidden">

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:700;color:#2f6fb5;letter-spacing:2px">BATEXCI ERP · FORMATION</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:600;color:#93a1b3;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:18.5px;letter-spacing:2px;margin-top:16px">ACCOMPAGNEMENT DES ÉQUIPES</div>
  <div class="bx-h1" style="font-size:24px;font-weight:900;color:#101828;line-height:1.2;margin-top:6px">Plan de Formation</div>

  <div style="flex:1;display:flex;flex-direction:column;gap:14px;margin-top:18px;min-height:0">

    <div style="display:grid;grid-template-columns:150px 60px 1fr;gap:16px;align-items:start;padding:10px 0;border-bottom:2px solid #2f6fb5;flex-shrink:0">
      <span class="bx-b" style="font-size:19.5px;font-weight:800;letter-spacing:2px;color:#2f6fb5">ÉTAPE 1</span>
      <span></span>
      <div>
        <div class="bx-h3" style="font-size:18.5px;font-weight:700;color:#101828">Présentation globale synthétique</div>
        <span class="bx-b" style="font-size:19.5px;color:#3d4a5c;line-height:1.45">Une présentation d'ensemble devant tout le personnel — direction, commerciaux, techniciens, ouvriers — pour donner une vision synthétique des 8 Blocs Fonctionnels avant les formations par groupe.</span>
      </div>
    </div>

    <div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;min-height:0">
      <div style="background:#eef1f6;border-radius:14px;padding:16px;display:flex;flex-direction:column">
        <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:17px;letter-spacing:1.5px">ÉTAPE 2 · GROUPE 1</div>
        <div class="bx-h3" style="font-size:20.5px;font-weight:700;color:#101828;margin-top:6px;line-height:1.25">Direction</div>
        <span class="bx-b" style="font-size:19.5px;color:#334155;line-height:1.5;margin-top:8px">Blocs 7 (Pilotage &amp; Gouvernance) et 1 (Finance &amp; Comptabilité) — les premiers formés.</span>
      </div>
      <div style="background:#eef1f6;border-radius:14px;padding:16px;display:flex;flex-direction:column">
        <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:17px;letter-spacing:1.5px">ÉTAPE 3 · GROUPE 2</div>
        <div class="bx-h3" style="font-size:20.5px;font-weight:700;color:#101828;margin-top:6px;line-height:1.25">Administration &amp; Commercial</div>
        <span class="bx-b" style="font-size:19.5px;color:#334155;line-height:1.5;margin-top:8px">Blocs 1 (Comptabilité), 6 (Commercial) et 8 (Administration), poste par poste.</span>
      </div>
      <div style="background:#eef1f6;border-radius:14px;padding:16px;display:flex;flex-direction:column">
        <div class="bx-b" style="color:#2f6fb5;font-weight:800;font-size:17px;letter-spacing:1.5px">ÉTAPE 4 · GROUPE 3</div>
        <div class="bx-h3" style="font-size:20.5px;font-weight:700;color:#101828;margin-top:6px;line-height:1.25">Responsables Techniques &amp; Techniciens</div>
        <span class="bx-b" style="font-size:19.5px;color:#334155;line-height:1.5;margin-top:8px">Blocs 3 (Studio Dessin) et 4 (Production &amp; Maintenance), au plus près du terrain.</span>
      </div>
    </div>

    <div style="background:#0e1b30;border-radius:14px;padding:16px 18px;display:flex;flex-direction:column;box-shadow:0 4px 14px rgba(18,42,86,0.3);flex-shrink:0">
      <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:17px;letter-spacing:1.5px;margin-bottom:8px">ORGANISATION PÉRIODIQUE</div>
      <span class="bx-b" style="font-size:19.5px;font-weight:500;color:#f1f5f9;line-height:1.5">Les sessions sont planifiées d'un commun accord avec l'usine, pour ne jamais perturber le rythme de travail en cours.</span>
    </div>

    <div style="background:#0e1b30;border-radius:14px;padding:18px 20px;display:flex;flex-direction:column;box-shadow:0 4px 14px rgba(18,42,86,0.3);flex-shrink:0">
      <div class="bx-b" style="color:#5fa0e0;font-weight:800;font-size:17px;letter-spacing:1.5px;margin-bottom:14px">PRÉREQUIS TECHNIQUES</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="width:34px;height:34px;border-radius:10px;background:rgba(95,160,224,0.15);display:flex;align-items:center;justify-content:center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5fa0e0" stroke-width="2" stroke-linecap="round"><path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16a6.5 6.5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="#5fa0e0" stroke="none"/></svg></div>
          <div class="bx-h3" style="font-size:17.5px;font-weight:700;color:#fff;line-height:1.25">Connexion Internet</div>
          <span class="bx-b" style="font-size:17.5px;color:#c3d5ec;line-height:1.4">Une liaison stable dans chaque département usine.</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="width:34px;height:34px;border-radius:10px;background:rgba(95,160,224,0.15);display:flex;align-items:center;justify-content:center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5fa0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg></div>
          <div class="bx-h3" style="font-size:17.5px;font-weight:700;color:#fff;line-height:1.25">Poste PC prioritaire</div>
          <span class="bx-b" style="font-size:17.5px;color:#c3d5ec;line-height:1.4">Usage pensé pour PC ; tablette ou smartphone restent utilisables.</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="width:34px;height:34px;border-radius:10px;background:rgba(95,160,224,0.15);display:flex;align-items:center;justify-content:center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5fa0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 18h6"/></svg></div>
          <div class="bx-h3" style="font-size:17.5px;font-weight:700;color:#fff;line-height:1.25">Aisance numérique de base</div>
          <span class="bx-b" style="font-size:17.5px;color:#c3d5ec;line-height:1.4">Savoir utiliser un smartphone ou une tablette au quotidien.</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="width:34px;height:34px;border-radius:10px;background:rgba(95,160,224,0.15);display:flex;align-items:center;justify-content:center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5fa0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l10-4 10 4-10 4-10-4z"/><path d="M6 10v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg></div>
          <div class="bx-h3" style="font-size:17.5px;font-weight:700;color:#fff;line-height:1.25">Personnel formé</div>
          <span class="bx-b" style="font-size:17.5px;color:#c3d5ec;line-height:1.4">Chaque utilisateur formé sur son poste avant l'ouverture des accès.</span>
        </div>
      </div>
    </div>

  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:10px;margin-top:14px;border-top:1px solid #d7dee8">
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#2f6fb5;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;color:#93a1b3">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#2f6fb5;letter-spacing:1px">08 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="09" style="background:#0f172a;display:flex;flex-direction:column;box-sizing:border-box;padding:3.2% 5%;position:relative;overflow:hidden;page-break-before:always">
  <div style="position:absolute;inset:0;background:radial-gradient(1200px 800px at 50% -10%, rgba(59,130,246,0.16), transparent)"></div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;position:relative;z-index:1">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:700;color:#5fa0e0;letter-spacing:2px">BATEXCI ERP · SUPERVISION</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:600;color:#8a9bb8;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div style="flex-shrink:0;margin-top:18px;text-align:center;position:relative;z-index:1">
    <div class="bx-h1" style="font-size:27px;font-weight:900;color:#fff;line-height:1.2">BRIQUE TRANSVERSALE — MOTEUR DE VALIDATION &amp; SIGNATURE MULTI-POSTES</div>
    <div class="bx-b" style="font-size:19px;font-weight:500;color:#8fb4de;line-height:1.5;margin-top:6px">Finance ↔ Studio Dessin ↔ Production — un circuit de gouvernance et de traçabilité des validations, structuré pour sécuriser chaque lancement en fabrication tout en gardant la souplesse du workflow terrain</div>
  </div>

  <div style="flex:1;display:grid;grid-template-columns:1.05fr 0.95fr;gap:36px;align-items:center;min-height:0;position:relative;z-index:1;margin-top:14px">

    <div style="min-width:0">
      <div class="bx-h3" style="font-size:20px;font-weight:800;color:#fff;line-height:1.3">DE LA COMMANDE À LA CLÔTURE<br><span style="font-size:18px">CHACUN DEPUIS SON ÉCRAN</span></div>
      <div class="bx-b" style="font-size:18.5px;font-weight:500;color:#8fb4de;line-height:1.4;margin-top:6px;margin-bottom:14px">Le même moteur de signatures séquentielles court sur la facture (Bloc 1) et sur la fiche technique de fabrication (Bloc 3) — jusqu'à 6 postes, sans aucun déplacement physique.</div>
      <div style="display:flex;flex-direction:column">
        <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.1)">
          <span class="bx-b" style="font-size:18.5px;font-weight:800;color:#5fa0e0;flex-shrink:0;width:16px">01</span>
          <span class="bx-b" style="font-size:17.5px;color:#e2e8f0;line-height:1.5"><b style="color:#fff">Saisie initiale —</b> le Commercial enregistre le client, initie la commande et édite la Proforma en direct depuis son poste.</span>
        </div>
        <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.1)">
          <span class="bx-b" style="font-size:18.5px;font-weight:800;color:#5fa0e0;flex-shrink:0;width:16px">02</span>
          <span class="bx-b" style="font-size:17.5px;color:#e2e8f0;line-height:1.5"><b style="color:#fff">Validation hiérarchique &amp; Quitus —</b> le Responsable Commercial, le Comptable et le Directeur signent la faisabilité et le volet financier sur leur écran.</span>
        </div>
        <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.1)">
          <span class="bx-b" style="font-size:18.5px;font-weight:800;color:#5fa0e0;flex-shrink:0;width:16px">03</span>
          <span class="bx-b" style="font-size:17.5px;color:#e2e8f0;line-height:1.5"><b style="color:#fff">Transfert technique Studio —</b> transmission automatique au Studio Dessin pour création du motif et signature du BAT.</span>
        </div>
        <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.1)">
          <span class="bx-b" style="font-size:18.5px;font-weight:800;color:#5fa0e0;flex-shrink:0;width:16px">04</span>
          <span class="bx-b" style="font-size:17.5px;color:#e2e8f0;line-height:1.5"><b style="color:#fff">Lancement Atelier —</b> l'Ordre de Fabrication (ODF) est envoyé en production, signé par le Chef de Production et le Directeur Technique.</span>
        </div>
        <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.1)">
          <span class="bx-b" style="font-size:18.5px;font-weight:800;color:#5fa0e0;flex-shrink:0;width:16px">05</span>
          <span class="bx-b" style="font-size:17.5px;color:#e2e8f0;line-height:1.5"><b style="color:#fff">Métrologie &amp; Sortie Magasin —</b> contrôle du métrage imprimé, affectation du lot et génération du ticket QR Code sécurisé.</span>
        </div>
        <div style="display:flex;gap:12px;padding:9px 0">
          <span class="bx-b" style="font-size:18.5px;font-weight:800;color:#5fa0e0;flex-shrink:0;width:16px">06</span>
          <span class="bx-b" style="font-size:17.5px;color:#e2e8f0;line-height:1.5"><b style="color:#fff">Clôture Direction &amp; Archivage —</b> émission de la Facture définitive (double signature) et génération automatique du rapport d'exploitation.</span>
        </div>
      </div>
      <div class="bx-b" style="font-size:16.5px;font-weight:600;color:#8a9bb8;margin-top:8px">Brique transversale du socle de déploiement, activée dès le lancement et affinée sur la trajectoire de finalisation.</div>
    </div>

    <div style="display:flex;justify-content:center;min-width:0">
      <div style="position:relative;width:480px;height:480px;flex-shrink:0">
        <svg width="480" height="480" style="position:absolute;inset:0" viewBox="0 0 480 480">
          <line x1="240" y1="240" x2="240" y2="90" stroke="rgba(95,160,224,0.4)" stroke-width="1.5"/>
          <line x1="240" y1="240" x2="357.3" y2="146.5" stroke="rgba(95,160,224,0.4)" stroke-width="1.5"/>
          <line x1="240" y1="240" x2="386.3" y2="273.4" stroke="rgba(95,160,224,0.4)" stroke-width="1.5"/>
          <line x1="240" y1="240" x2="305.1" y2="375.2" stroke="rgba(95,160,224,0.4)" stroke-width="1.5"/>
          <line x1="240" y1="240" x2="174.9" y2="375.2" stroke="rgba(125,211,160,0.55)" stroke-width="1.5" stroke-dasharray="3 3"/>
          <line x1="240" y1="240" x2="93.7" y2="273.4" stroke="rgba(95,160,224,0.4)" stroke-width="1.5"/>
          <line x1="240" y1="240" x2="122.7" y2="146.5" stroke="rgba(95,160,224,0.4)" stroke-width="1.5"/>
          <circle cx="240" cy="90" r="4" fill="#5fa0e0"/>
          <circle cx="357.3" cy="146.5" r="4" fill="#5fa0e0"/>
          <circle cx="386.3" cy="273.4" r="4" fill="#5fa0e0"/>
          <circle cx="305.1" cy="375.2" r="4" fill="#5fa0e0"/>
          <circle cx="174.9" cy="375.2" r="4" fill="#4ade80"/>
          <circle cx="93.7" cy="273.4" r="4" fill="#5fa0e0"/>
          <circle cx="122.7" cy="146.5" r="4" fill="#5fa0e0"/>
        </svg>
        <div style="position:absolute;left:240px;top:240px;transform:translate(-50%,-50%);width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(95,160,224,0.34),rgba(95,160,224,0.04) 72%);border:1px solid rgba(95,160,224,0.55);display:flex;align-items:center;justify-content:center;text-align:center">
          <span class="bx-h3" style="font-size:13px;font-weight:800;color:#fff;letter-spacing:0.4px;line-height:1.2">MOTEUR DE<br>SIGNATURE<br>MULTI-POSTES</span>
        </div>
        <div style="position:absolute;left:310.7px;top:169.3px;transform:translate(-50%,-50%);background:rgba(95,160,224,0.14);border:1px solid rgba(95,160,224,0.5);border-radius:999px;padding:2px 7px;white-space:nowrap"><span class="bx-b" style="font-size:11.5px;font-weight:800;color:#a9d4ff;letter-spacing:0.3px">Suivi Live</span></div>
        <div style="position:absolute;left:310.7px;top:310.7px;transform:translate(-50%,-50%);background:rgba(95,160,224,0.14);border:1px solid rgba(95,160,224,0.5);border-radius:999px;padding:2px 7px;white-space:nowrap"><span class="bx-b" style="font-size:11.5px;font-weight:800;color:#a9d4ff;letter-spacing:0.3px">Quitus Sécurisé</span></div>
        <div style="position:absolute;left:169.3px;top:310.7px;transform:translate(-50%,-50%);background:rgba(95,160,224,0.14);border:1px solid rgba(95,160,224,0.5);border-radius:999px;padding:2px 7px;white-space:nowrap"><span class="bx-b" style="font-size:11.5px;font-weight:800;color:#a9d4ff;letter-spacing:0.3px">Zéro Ressaisie</span></div>
        <div style="position:absolute;left:169.3px;top:169.3px;transform:translate(-50%,-50%);background:rgba(95,160,224,0.14);border:1px solid rgba(95,160,224,0.5);border-radius:999px;padding:2px 7px;white-space:nowrap"><span class="bx-b" style="font-size:11.5px;font-weight:800;color:#a9d4ff;letter-spacing:0.3px">Archivage Auto</span></div>
        <div style="position:absolute;left:240px;top:65px;transform:translate(-50%,-50%);width:130px;text-align:center">
          <div class="bx-b" style="font-size:13px;font-weight:800;color:#5fa0e0;letter-spacing:1.2px">01</div>
          <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#f1f5f9;line-height:1.25;margin-top:2px">Commercial</div>
        </div>
        <div style="position:absolute;left:376.8px;top:130.9px;transform:translate(-50%,-50%);width:130px;text-align:left">
          <div class="bx-b" style="font-size:13px;font-weight:800;color:#5fa0e0;letter-spacing:1.2px">02</div>
          <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#f1f5f9;line-height:1.25;margin-top:2px">Comptabilité</div>
        </div>
        <div style="position:absolute;left:410.7px;top:278.9px;transform:translate(-50%,-50%);width:130px;text-align:left">
          <div class="bx-b" style="font-size:13px;font-weight:800;color:#5fa0e0;letter-spacing:1.2px">03</div>
          <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#f1f5f9;line-height:1.25;margin-top:2px">Studio BAT</div>
        </div>
        <div style="position:absolute;left:315.9px;top:397.7px;transform:translate(-50%,-50%);width:130px;text-align:left">
          <div class="bx-b" style="font-size:13px;font-weight:800;color:#5fa0e0;letter-spacing:1.2px">04</div>
          <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#f1f5f9;line-height:1.25;margin-top:2px">Production ODF</div>
        </div>
        <div style="position:absolute;left:164.1px;top:397.7px;transform:translate(-50%,-50%);width:130px;text-align:right">
          <div class="bx-b" style="font-size:13px;font-weight:800;color:#4ade80;letter-spacing:1.2px">24/7</div>
          <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#f1f5f9;line-height:1.25;margin-top:2px">Supervision Technique</div>
        </div>
        <div style="position:absolute;left:69.3px;top:278.9px;transform:translate(-50%,-50%);width:130px;text-align:right">
          <div class="bx-b" style="font-size:13px;font-weight:800;color:#5fa0e0;letter-spacing:1.2px">05</div>
          <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#f1f5f9;line-height:1.25;margin-top:2px">Magasin QR</div>
        </div>
        <div style="position:absolute;left:103.2px;top:130.9px;transform:translate(-50%,-50%);width:130px;text-align:right">
          <div class="bx-b" style="font-size:13px;font-weight:800;color:#5fa0e0;letter-spacing:1.2px">06</div>
          <div class="bx-h3" style="font-size:14.5px;font-weight:700;color:#f1f5f9;line-height:1.25;margin-top:2px">Rapports &amp; Ventes</div>
        </div>
      </div>
    </div>

  </div>

  <div style="flex-shrink:0;margin-top:14px;position:relative;z-index:1;text-align:center">
    <div class="bx-b" style="font-size:19px;font-weight:500;color:#c4d6ec;line-height:1.6;max-width:900px;margin:0 auto">À chaque seconde, la Direction conserve un œil sur la totalité des flux : chaque article vendu est comptabilisé en direct avec une mise à jour instantanée du Chiffre d'Affaires et des estimations de bénéfice.</div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:10px;margin-top:16px;border-top:1px solid rgba(255,255,255,0.14);position:relative;z-index:1">
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#5fa0e0;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;color:#8a9bb8">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#5fa0e0;letter-spacing:1px">09 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="10" style="background:linear-gradient(180deg,#ffffff 0%,#f3f9ff 55%,#eef6ff 100%);display:flex;flex-direction:column;box-sizing:border-box;padding:3.2% 5%;position:relative;overflow:hidden;page-break-before:always">

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;position:relative;z-index:1">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:800;color:#2f6fb5;letter-spacing:2px">BATEXCI ERP · GOUVERNANCE</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#334155;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div style="flex-shrink:0;margin-top:18px;position:relative;z-index:1;border-bottom:2px solid #2f6fb5;padding-bottom:10px">
    <div class="bx-h1" style="font-size:28px;font-weight:900;color:#0f172a;line-height:1.2">PILOTAGE EN TEMPS RÉEL ET GOUVERNANCE DES ACCÈS</div>
    <div class="bx-b" style="font-size:19.5px;font-weight:700;color:#1e293b;line-height:1.5;margin-top:6px">Transparence totale sur les ventes, la rentabilité et la sécurité applicative</div>
  </div>

  <div style="flex-shrink:0;margin-top:16px;position:relative;z-index:1">
    <div class="bx-b" style="color:#2f6fb5;font-weight:900;font-size:17px;letter-spacing:1.5px;margin-bottom:10px">LA VISION EN LIVE POUR LA DIRECTION</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:28px">
      <div>
        <div class="bx-h3" style="font-size:19px;font-weight:800;color:#0f172a;line-height:1.3">Suivi Ventes &amp; Articles</div>
        <div style="width:32px;height:2px;background:#2f6fb5;margin:7px 0"></div>
        <div class="bx-b" style="font-size:16px;font-weight:700;color:#1e293b;line-height:1.5">Analyse instantanée des ventes par article, par produit et par commercial en temps réel.</div>
      </div>
      <div style="border-left:1px solid #bcd6ef;padding-left:28px">
        <div class="bx-h3" style="font-size:19px;font-weight:800;color:#0f172a;line-height:1.3">Indicateurs Financiers</div>
        <div style="width:32px;height:2px;background:#2f6fb5;margin:7px 0"></div>
        <div class="bx-b" style="font-size:16px;font-weight:700;color:#1e293b;line-height:1.5">Visualisation directe du Chiffre d'Affaires Brut et calcul automatique du Bénéfice Brut.</div>
      </div>
      <div style="border-left:1px solid #bcd6ef;padding-left:28px">
        <div class="bx-h3" style="font-size:19px;font-weight:800;color:#0f172a;line-height:1.3">Exclusivité des Motifs</div>
        <div style="width:32px;height:2px;background:#2f6fb5;margin:7px 0"></div>
        <div class="bx-b" style="font-size:16px;font-weight:700;color:#1e293b;line-height:1.5">Protection d'un motif pour un client donné : brique transversale Commercial ↔ Studio Dessin.</div>
      </div>
    </div>
  </div>

  <div style="flex-shrink:0;margin-top:22px;position:relative;z-index:1">
    <div class="bx-b" style="color:#2f6fb5;font-weight:900;font-size:17px;letter-spacing:1.5px;margin-bottom:14px;text-align:center">GOUVERNANCE &amp; PILOTAGE DES ACCÈS — 18 RÔLES NATIFS SÉCURISÉMENT DÉPLOYÉS</div>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px">
      <div style="background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.12)">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #2f6fb5;padding-bottom:7px"><span class="bx-b" style="font-size:13.5px;font-weight:900;color:#0f172a;letter-spacing:0.3px">DIRECTION</span><span class="bx-b" style="font-size:10.5px;font-weight:800;color:#fff;background:#2f6fb5;border-radius:999px;padding:2px 7px">2</span></div>
        <div style="display:flex;flex-direction:column;margin-top:9px">
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Direction</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Directeur Technique</span>
        </div>
      </div>
      <div style="background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.12)">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #2f6fb5;padding-bottom:7px"><span class="bx-b" style="font-size:13.5px;font-weight:900;color:#0f172a;letter-spacing:0.3px">COMMERCIAL</span><span class="bx-b" style="font-size:10.5px;font-weight:800;color:#fff;background:#2f6fb5;border-radius:999px;padding:2px 7px">3</span></div>
        <div style="display:flex;flex-direction:column;margin-top:9px">
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Resp. Commercial</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Commercial</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Showroom</span>
        </div>
      </div>
      <div style="background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.12)">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #2f6fb5;padding-bottom:7px"><span class="bx-b" style="font-size:12px;font-weight:900;color:#0f172a;letter-spacing:0.3px">PRODUCTION &amp; ATELIER</span><span class="bx-b" style="font-size:10.5px;font-weight:800;color:#fff;background:#2f6fb5;border-radius:999px;padding:2px 7px;flex-shrink:0">4</span></div>
        <div style="display:flex;flex-direction:column;margin-top:9px">
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Chef Production</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Assistant Chef Prod.</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Chef d'Équipe</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Studio Dessin</span>
        </div>
      </div>
      <div style="background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.12)">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #2f6fb5;padding-bottom:7px"><span class="bx-b" style="font-size:12px;font-weight:900;color:#0f172a;letter-spacing:0.3px">MAGASIN &amp; LOGISTIQUE</span><span class="bx-b" style="font-size:10.5px;font-weight:800;color:#fff;background:#2f6fb5;border-radius:999px;padding:2px 7px;flex-shrink:0">3</span></div>
        <div style="display:flex;flex-direction:column;margin-top:9px">
          <span class="bx-b" style="font-size:12.5px;font-weight:700;color:#1e293b;line-height:2">Resp. Valorisation &amp; Stocks</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Livraison</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Gardien</span>
        </div>
      </div>
      <div style="background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.12)">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #2f6fb5;padding-bottom:7px"><span class="bx-b" style="font-size:12px;font-weight:900;color:#0f172a;letter-spacing:0.3px">FINANCE &amp; COMPTA.</span><span class="bx-b" style="font-size:10.5px;font-weight:800;color:#fff;background:#2f6fb5;border-radius:999px;padding:2px 7px;flex-shrink:0">4</span></div>
        <div style="display:flex;flex-direction:column;margin-top:9px">
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">DAF</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Comptabilité</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Caisse</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Contrôle de Gestion</span>
        </div>
      </div>
      <div style="background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 4px 10px rgba(18,42,86,0.12)">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #2f6fb5;padding-bottom:7px"><span class="bx-b" style="font-size:13.5px;font-weight:900;color:#0f172a;letter-spacing:0.3px">RH &amp; SUPPORT</span><span class="bx-b" style="font-size:10.5px;font-weight:800;color:#fff;background:#2f6fb5;border-radius:999px;padding:2px 7px">2</span></div>
        <div style="display:flex;flex-direction:column;margin-top:9px">
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">RH</span>
          <span class="bx-b" style="font-size:13.5px;font-weight:700;color:#1e293b;line-height:2">Support</span>
        </div>
      </div>
    </div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:10px;margin-top:14px;border-top:1px solid #bcd6ef;position:relative;z-index:1">
    <div class="bx-b" style="font-size:17px;font-weight:800;color:#2f6fb5;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#475467">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:800;color:#2f6fb5;letter-spacing:1px">10 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="11" style="background:linear-gradient(180deg,#ffffff 0%,#f3f9ff 55%,#eef6ff 100%);display:flex;flex-direction:column;box-sizing:border-box;padding:3% 5%;position:relative;overflow:hidden;page-break-before:always">

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:800;color:#2f6fb5;letter-spacing:2px">BATEXCI ERP · PRODUCTION</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#334155;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div style="flex-shrink:0;margin-top:10px;border-bottom:2px solid #2f6fb5;padding-bottom:8px">
    <div class="bx-h1" style="font-size:28px;font-weight:900;color:#0f172a;line-height:1.2">PILOTAGE TECHNIQUE &amp; RENDEMENT DE PRODUCTION</div>
    <div class="bx-b" style="font-size:19.5px;font-weight:700;color:#1e293b;line-height:1.5;margin-top:6px">Supervision de la chaîne de fabrication — Suivi des utilités, gestion des incidents et traçabilité ODF</div>
  </div>

  <div style="flex-shrink:0;margin-top:12px">
    <div style="display:flex;flex-direction:column;align-items:center">
      <div style="border:2px solid #2f6fb5;border-radius:12px;background:#eaf3ff;padding:10px 26px;text-align:center">
        <div class="bx-b" style="font-size:19.5px;font-weight:900;color:#0f172a;letter-spacing:0.5px">POSTE DE COMMANDEMENT D.T.</div>
        <div class="bx-b" style="font-size:17px;font-weight:700;color:#2f6fb5;letter-spacing:0.5px;margin-top:2px">(Directeur Technique)</div>
      </div>
      <div style="width:2px;height:16px;background:#2f6fb5"></div>
      <div style="height:2px;background:#2f6fb5;width:92%"></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:0">
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:2px;height:14px;background:#2f6fb5"></div>
        <div class="bx-b" style="font-size:17px;font-weight:900;color:#0f172a;letter-spacing:0.5px;text-align:center;margin-top:6px">ENTRÉE UTILITÉS &amp; ÉNERGIE</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;margin-top:8px;width:100%">
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Vapeur</span></div>
          <span class="bx-b" style="font-size:17px;color:#2f6fb5;font-weight:900">↓</span>
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Pression</span></div>
          <span class="bx-b" style="font-size:17px;color:#2f6fb5;font-weight:900">↓</span>
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Électricité</span></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:2px;height:14px;background:#2f6fb5"></div>
        <div class="bx-b" style="font-size:17px;font-weight:900;color:#0f172a;letter-spacing:0.5px;text-align:center;margin-top:6px">CHAÎNE DE FABRICATION ODF</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;margin-top:8px;width:100%">
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Impression</span></div>
          <span class="bx-b" style="font-size:17px;color:#2f6fb5;font-weight:900">↓</span>
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Fixation</span></div>
          <span class="bx-b" style="font-size:17px;color:#2f6fb5;font-weight:900">↓</span>
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Séchage</span></div>
          <span class="bx-b" style="font-size:17px;color:#2f6fb5;font-weight:900">↓</span>
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Finition</span></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:2px;height:14px;background:#2f6fb5"></div>
        <div class="bx-b" style="font-size:17px;font-weight:900;color:#0f172a;letter-spacing:0.5px;text-align:center;margin-top:6px">GARDE DE QUALITÉ &amp; SCAN</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;margin-top:8px;width:100%">
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Métrologie Tissu</span></div>
          <span class="bx-b" style="font-size:17px;color:#2f6fb5;font-weight:900">↓</span>
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Ticket QR Code</span></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:2px;height:14px;background:#2f6fb5"></div>
        <div class="bx-b" style="font-size:17px;font-weight:900;color:#0f172a;letter-spacing:0.5px;text-align:center;margin-top:6px">MATRICE D'INCIDENTS</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;margin-top:8px;width:100%">
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Pannes Machines</span></div>
          <span class="bx-b" style="font-size:17px;color:#2f6fb5;font-weight:900">↓</span>
          <div style="border:1.5px solid #2f6fb5;border-radius:7px;padding:5px 10px;width:100%;box-sizing:border-box;text-align:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Calcul d'Écart</span></div>
        </div>
      </div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:16px;flex-shrink:0">
    <div>
      <div class="bx-b" style="color:#2f6fb5;font-weight:900;font-size:18.5px;letter-spacing:1px;margin-bottom:10px">MATRICE DES INCIDENTS &amp; TEMPS D'ARRÊT USINE</div>
      <div style="display:flex;flex-direction:column;gap:9px">
        <div>
          <div style="display:flex;justify-content:space-between"><span class="bx-b" style="font-size:17.5px;font-weight:800;color:#0f172a">Pannes Utilités (Vapeur/Électricité)</span></div>
          <div style="height:12px;border-radius:5px;background:#dbeafe;width:100%;margin-top:4px;overflow:hidden"><div style="height:100%;width:62%;background:#2f6fb5;border-radius:5px"></div></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between"><span class="bx-b" style="font-size:17.5px;font-weight:800;color:#0f172a">Pannes Mécaniques</span></div>
          <div style="height:12px;border-radius:5px;background:#dbeafe;width:100%;margin-top:4px;overflow:hidden"><div style="height:100%;width:38%;background:#7fb2e5;border-radius:5px"></div></div>
        </div>
      </div>
      <div style="margin-top:12px;border-top:1px solid #bcd6ef;padding-top:10px">
        <div class="bx-b" style="font-size:17.5px;font-weight:800;color:#0f172a">Déclaration d'incident &amp; Remontée automatique d'arrêt machine</div>
        <div class="bx-b" style="font-size:18px;font-weight:700;color:#334155;line-height:1.5;margin-top:4px">Chaque saisie d'arrêt technique (vapeur, électricité, chaudière) génère une notification d'alerte en temps réel vers l'encadrement de production (Responsable Production, Chef d'Atelier) et calcule immédiatement l'impact sur le rendement de l'ODF.</div>
      </div>
    </div>
    <div>
      <div class="bx-b" style="color:#2f6fb5;font-weight:900;font-size:18.5px;letter-spacing:1px;margin-bottom:10px">DÉCOMPOSITION DU COÛT DE REVIENT DE L'ODF</div>
      <div style="height:26px;border-radius:6px;overflow:hidden;display:flex;width:100%">
        <div style="width:55%;background:#2f6fb5;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#fff">Matière</span></div>
        <div style="width:25%;background:#7fb2e5;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:17px;font-weight:800;color:#0f172a">Énergie</span></div>
        <div style="width:20%;background:#c3d8ef;display:flex;align-items:center;justify-content:center"><span class="bx-b" style="font-size:16.5px;font-weight:800;color:#0f172a">Temps M.</span></div>
      </div>
      <div style="margin-top:12px;border-top:1px solid #bcd6ef;padding-top:10px;display:flex;align-items:center;justify-content:space-between">
        <span class="bx-b" style="font-size:17.5px;font-weight:800;color:#0f172a">Impact Réduction du Gâchis</span>
        <span class="bx-b" style="font-size:19px;font-weight:900;color:#2f6fb5">-25%</span>
      </div>
      <div class="bx-b" style="font-size:18px;font-weight:700;color:#334155;line-height:1.4;margin-top:4px">de pertes teintures/tissu directement répercutées sur le coût global de la commande.</div>
    </div>
  </div>

  <div style="flex:1;min-height:0"></div>

  <div style="flex-shrink:0;border-top:2px solid #2f6fb5;padding-top:10px;margin-top:10px">
    <div class="bx-h3" style="font-size:19px;font-weight:900;color:#0f172a;margin-bottom:5px">Comment ça marche sur l'écran du Directeur Technique ?</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:500;color:#475467;line-height:1.45">Le Directeur Technique et le Chef de Production n'ont plus à courir dans l'usine. Dès qu'une machine s'arrête ou qu'une baisse de pression de vapeur survient, le système l'enregistre immédiatement sur leur poste. Le coût réel de chaque mètre de tissu est recalculé en temps réel avec une transparence totale pour la Direction.</div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding-top:8px;margin-top:8px;border-top:1px solid #bcd6ef">
    <div class="bx-b" style="font-size:17px;font-weight:800;color:#2f6fb5;letter-spacing:1px">PILOTER · TRACER · SÉCURISER · DÉCIDER</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:700;color:#475467">Document confidentiel · contact@batexci-erp.com</div>
    <div class="bx-b" style="font-size:16.5px;font-weight:800;color:#2f6fb5;letter-spacing:1px">11 / 12</div>
  </div>
</section>`,

`<section class="page" data-screen-label="12" style="background:linear-gradient(180deg,#ffffff 0%,#f3f9ff 55%,#eef6ff 100%);display:flex;flex-direction:column;box-sizing:border-box;padding:4% 6%;position:relative;overflow:hidden;page-break-before:always">
  <div class="bx-b" style="position:absolute;bottom:20px;right:28px;font-size:17px;font-weight:700;color:#93a1b3;letter-spacing:1px;z-index:2">12 / 12</div>

  <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
    <div style="display:flex;align-items:center;gap:14px;min-width:0">
      <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3f7fc4,#2a5a95);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:900;font-size:19px;color:#fff;flex-shrink:0">BX</div>
      <div class="bx-b" style="font-size:18.5px;font-weight:800;color:#2f6fb5;letter-spacing:2px">BATEXCI ERP · SOMMAIRE</div>
    </div>
    <div class="bx-b" style="font-size:17px;font-weight:700;color:#334155;letter-spacing:1.5px;white-space:nowrap">EVOTEX 1.0</div>
  </div>

  <div style="flex-shrink:0;margin-top:18px">
    <div class="bx-h1" style="font-size:31px;font-weight:900;color:#0f172a;line-height:1.15">BATEXCI ERP / EVOTEX 1.0</div>
    <div class="bx-b" style="font-size:18px;font-weight:700;color:#1e293b;line-height:1.5;margin-top:6px">Plateforme Unifiée de Pilotage Industrialisé &amp; Gouvernance Financière — 8 Blocs Fonctionnels, 2 Briques Transversales</div>
    <div class="bx-b" style="font-size:17px;font-weight:800;color:#2f6fb5;letter-spacing:0.5px;margin-top:8px">Document Confidentiel — Usage Exclusif de la Direction / BATEXCI ERP 2026</div>
  </div>

  <div style="flex-shrink:0;margin-top:14px;border-bottom:2px solid #2f6fb5"></div>

  <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:18px;min-height:0;align-content:start">
    <div style="display:flex;flex-direction:column">
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">01</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Couverture &amp; Vision Stratégique</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">02</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Architecture en 8 Blocs Fonctionnels &amp; Briques Transversales</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">03</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Le Cœur de la Plateforme — Valeurs &amp; Blocs</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">04</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Socle Opérationnel — Mois 1-2</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">05</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Détail du Socle Opérationnel</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">06</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Trajectoire de Finalisation — Mois 3-6</span></div>
    </div>
    <div style="display:flex;flex-direction:column">
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">07</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Catalogue : Socle, Avance Opérationnelle &amp; Phase 2</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">08</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Plan d'Accompagnement &amp; Calendrier de Formation</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">09</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Moteur de Validation &amp; Signature Multi-Postes</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">10</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Gouvernance des Accès &amp; Architecture des 18 Rôles</span></div>
      <div style="display:flex;align-items:baseline;gap:16px;padding:8px 0;border-bottom:1px solid #d7dee8"><span class="bx-h1" style="font-size:21px;font-weight:900;color:#0f172a;flex-shrink:0;width:40px">11</span><span class="bx-h3" style="font-size:17.5px;font-weight:800;color:#0f172a">Pilotage Technique &amp; Rendement de Production</span></div>
    </div>
  </div>

  <div style="flex-shrink:0;margin-top:14px;background:rgba(95,160,224,0.08);border:1px solid rgba(95,160,224,0.3);border-radius:12px;padding:12px 18px">
    <div class="bx-b" style="color:#2f6fb5;font-weight:900;font-size:13.5px;letter-spacing:1.2px;margin-bottom:5px">ENGAGEMENT DE CONFIANCE</div>
    <div class="bx-b" style="font-size:13.5px;color:#334155;line-height:1.5">Transparence totale : chaque écart connu ou donnée non encore disponible est signalé directement à l'écran par un badge dédié, jamais masqué ni présenté comme acquis à tort.</div>
  </div>

  <div style="flex-shrink:0;margin-top:14px;border-top:1px solid #bcd6ef;padding-top:12px;text-align:center">
    <div class="bx-b" style="font-size:16.5px;font-weight:800;color:#2f6fb5;letter-spacing:1px">CONFIDENTIEL / BATEXCI ERP 2026</div>
  </div>
</section>`
  ];

  const ANCHOR_IDS = ["licence-vente-totale", "licence-deploiement", "licence-saas"];

  function findPageIndexById(id) {
    for (let i = 0; i < PAGES.length; i++) {
      if (PAGES[i].includes('id="' + id + '"')) return i;
    }
    return -1;
  }

  let current = 0;

  function computeScale() {
    const viewport = document.getElementById("socle-viewport");
    const stage = document.getElementById("socle-stage");
    if (!viewport || !stage) return;
    const availableWidth = viewport.parentElement.clientWidth;
    const scale = Math.min(1, availableWidth / STAGE_W);
    stage.style.transform = "scale(" + scale + ")";
    viewport.style.width = Math.round(STAGE_W * scale) + "px";
    // Hauteur reelle du contenu (jamais une valeur fixe) : chaque page a sa
    // propre densite de contenu -- une hauteur commune imposee a toutes les
    // pages forcait un contenu plus grand (apres l'agrandissement des
    // polices) a deborder et se chevaucher avec le bloc suivant.
    const naturalHeight = stage.scrollHeight;
    viewport.style.height = Math.round(naturalHeight * scale) + "px";
  }

  function renderStage() {
    const stage = document.getElementById("socle-stage");
    const info = document.getElementById("socle-pager-info");
    if (stage) stage.innerHTML = PAGES[current];
    if (info) info.textContent = "Page " + (current + 1) + " / " + PAGES.length;
    document.querySelectorAll(".socle-dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
    const prevBtn = document.getElementById("socle-prev");
    const nextBtn = document.getElementById("socle-next");
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === PAGES.length - 1;
    computeScale();
  }

  function goTo(index) {
    current = Math.max(0, Math.min(PAGES.length - 1, index));
    renderStage();
    window.scrollTo(0, 0);
  }

  function onKeydown(e) {
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft") goTo(current - 1);
  }

  Views.socle = {
    title: "EVOTEX 1.0 — Socle de Lancement",

    render() {
      const dots = PAGES.map((_, i) => '<button class="socle-dot" data-dot="' + i + '" aria-label="Page ' + (i + 1) + '"></button>').join("");
      return `
        <div class="socle">
          <div class="socle-topbar">
            <button class="evx-retour" data-nav="#/">&#8592; Retour au hub</button>
            <div class="socle-pager-info" id="socle-pager-info"></div>
          </div>
          <div class="socle-viewport" id="socle-viewport">
            <div class="socle-stage" id="socle-stage"></div>
          </div>
          <div class="socle-controls">
            <button class="socle-navbtn" id="socle-prev">&#8249; Précédent</button>
            <div class="socle-dots">${dots}</div>
            <button class="socle-navbtn" id="socle-next">Suivant &#8250;</button>
          </div>
        </div>
      `;
    },

    mount(root) {
      root.querySelectorAll("[data-nav]").forEach((el) => {
        el.addEventListener("click", () => { window.location.hash = el.getAttribute("data-nav"); });
      });

      // Saut direct vers une page ancree (liens "En savoir plus" depuis les
      // Licences), format de hash : #/socle-lancement/<ancre>
      const hash = window.location.hash;
      let startIndex = 0;
      const parts = hash.split("/");
      const anchor = parts.length > 2 ? parts[2] : null;
      if (anchor) {
        const idx = findPageIndexById(anchor);
        if (idx >= 0) startIndex = idx;
      }
      current = startIndex;

      document.getElementById("socle-prev").addEventListener("click", () => goTo(current - 1));
      document.getElementById("socle-next").addEventListener("click", () => goTo(current + 1));
      root.querySelectorAll("[data-dot]").forEach((dot) => {
        dot.addEventListener("click", () => goTo(parseInt(dot.getAttribute("data-dot"), 10)));
      });

      window.addEventListener("resize", computeScale);
      document.addEventListener("keydown", onKeydown);

      renderStage();

      // Certaines pages utilisent la police d'affichage (Sora) dans des
      // titres denses : si computeScale() mesure stage.scrollHeight avant
      // que cette police ait fini de se charger, le texte se redessine
      // ensuite dans une police plus large/haute et deborde du conteneur
      // (overflow: hidden sur .socle-viewport) -- retour utilisateur du
      // 17/09/2026, bug intermittent au tout premier affichage, jamais
      // revu apres un aller-retour de page (police alors deja en cache).
      // Une seconde mesure une fois les polices reellement pretes evite ce
      // decalage, sans rien changer au comportement normal.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(computeScale);
      }
    },

    unmount() {
      window.removeEventListener("resize", computeScale);
      document.removeEventListener("keydown", onKeydown);
    },
  };
})();
