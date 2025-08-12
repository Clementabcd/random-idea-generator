import React, { useState, useCallback } from 'react';
import { Shuffle, Lightbulb, Gamepad2, BookOpen, Wrench, Globe } from 'lucide-react';

// Déplacer les banques de données en dehors du composant
const wordBanks = {
  objects: ['chat', 'grenouille', 'robot', 'dragon', 'pizza', 'horloge', 'nuage', 'diamant', 'plume', 'miroir', 'clé', 'étoile', 'flamme', 'cristal', 'boussole', 'papillon', 'engrenage', 'potion', 'livre', 'couronne'],
  places: ['espace', 'jungle', 'océan', 'montagne', 'désert', 'ville', 'forêt', 'laboratoire', 'château', 'grotte', 'île', 'volcan', 'bibliothèque', 'marché', 'temple', 'usine', 'jardin', 'tunnel', 'tour', 'pont'],
  actions: ['voler', 'danser', 'construire', 'explorer', 'cuisiner', 'collecter', 'sauver', 'créer', 'décorer', 'naviguer', 'escalader', 'plonger', 'courir', 'peindre', 'chanter', 'jardiner', 'réparer', 'découvrir', 'organiser', 'transformer'],
  adjectives: ['magique', 'invisible', 'géant', 'miniature', 'lumineux', 'transparent', 'coloré', 'ancien', 'futuriste', 'mystérieux', 'rapide', 'lent', 'bruyant', 'silencieux', 'parfumé', 'brillant', 'doux', 'rugueux', 'chaud', 'glacé'],
  themes: ['puzzle', 'course', 'aventure', 'stratégie', 'créatif', 'social', 'éducatif', 'musical', 'sportif', 'mystère', 'science', 'art', 'cuisine', 'mode', 'voyage', 'nature', 'technologie', 'histoire', 'fantaisie', 'réalité'],
  concepts: ['temps', 'gravité', 'mémoire', 'rêves', 'émotions', 'couleurs', 'sons', 'parfums', 'saisons', 'météo', 'lumière', 'ombre', 'mouvement', 'équilibre', 'chaos', 'harmonie', 'transformation', 'connexion', 'croissance', 'cycle']
};

const ideaTemplates = {
  jeu: [
    "Un jeu de {theme} dans {place} avec des {object}",
    "Un {adjective} jeu où on doit {action} des {object}",
    "Un jeu de {theme} {adjective} inspiré par {concept}",
    "Un jeu où des {object} {adjective} doivent {action} dans {place}",
    "Un jeu de {theme} qui combine {object} et {concept}"
  ],
  projet: [
    "Un site web de {theme} avec des {object} {adjective}",
    "Une application pour {action} des {object} dans {place}",
    "Un projet {adjective} qui relie {concept} et {object}",
    "Une plateforme pour {action} avec des {object} dans {place}",
    "Un outil {adjective} basé sur {concept} et {theme}"
  ],
  histoire: [
    "L'histoire d'un {object} {adjective} qui doit {action} dans {place}",
    "Un conte sur des {object} qui découvrent {concept} dans {place}",
    "L'aventure d'un héros qui peut {action} avec des {object} {adjective}",
    "Une histoire où {concept} transforme tous les {object} de {place}",
    "Le récit d'un {place} {adjective} peuplé de {object} magiques"
  ],
  invention: [
    "Une machine {adjective} qui peut {action} des {object}",
    "Un objet qui combine {object} et {concept} pour {action}",
    "Une invention {adjective} inspirée par {object} de {place}",
    "Un gadget pour {action} basé sur {concept} et {theme}",
    "Un appareil {adjective} qui transforme {object} en {concept}"
  ]
};

const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

const RandomIdeaGenerator = () => {
  const [currentIdea, setCurrentIdea] = useState('');
  const [ideaType, setIdeaType] = useState('jeu');

  const generateIdea = useCallback(() => {
    const template = getRandom(ideaTemplates[ideaType]);
    
    let idea = template
      .replace('{object}', getRandom(wordBanks.objects))
      .replace('{place}', getRandom(wordBanks.places))
      .replace('{action}', getRandom(wordBanks.actions))
      .replace('{adjective}', getRandom(wordBanks.adjectives))
      .replace('{theme}', getRandom(wordBanks.themes))
      .replace('{concept}', getRandom(wordBanks.concepts));

    setCurrentIdea(idea);
  }, [ideaType]); // Maintenant ideaType est la seule dépendance nécessaire

  const getIcon = (type) => {
    switch(type) {
      case 'jeu': return <Gamepad2 className="w-5 h-5" />;
      case 'projet': return <Wrench className="w-5 h-5" />;
      case 'histoire': return <BookOpen className="w-5 h-5" />;
      case 'invention': return <Lightbulb className="w-5 h-5" />;
      default: return <Shuffle className="w-5 h-5" />;
    }
  };

  React.useEffect(() => {
    generateIdea();
  }, [ideaType, generateIdea]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shuffle className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">Générateur d'idées aléatoires</h1>
          </div>
          <p className="text-gray-300 text-lg">Combine des mots aléatoires pour créer des concepts créatifs !</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {Object.keys(ideaTemplates).map((type) => (
              <button
                key={type}
                onClick={() => setIdeaType(type)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  ideaType === type
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-102'
                }`}
              >
                {getIcon(type)}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-8 mb-8 border border-yellow-400/30">
              <div className="flex items-center justify-center gap-3 mb-4">
                {getIcon(ideaType)}
                <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                  Idée de {ideaType}
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                {currentIdea || "Cliquez sur 'Nouvelle idée' pour commencer !"}
              </p>
            </div>

            <button
              onClick={generateIdea}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
            >
              <Shuffle className="w-6 h-6" />
              Nouvelle idée !
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              Comment ça marche ?
            </h3>
            <div className="text-gray-300 space-y-2">
              <p>• Choisissez un type d'idée (jeu, projet, histoire, invention)</p>
              <p>• L'algorithme combine des mots aléatoires selon des modèles</p>
              <p>• Chaque clic génère une nouvelle combinaison unique</p>
              <p>• Laissez votre imagination développer l'idée !</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              Exemples d'utilisation
            </h3>
            <div className="text-gray-300 space-y-2">
              <p>• Game jams et hackathons</p>
              <p>• Séances de brainstorming créatif</p>
              <p>• Exercices d'écriture créative</p>
              <p>• Inspiration pour projets personnels</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Générateur alimenté par {Object.values(wordBanks).reduce((acc, bank) => acc + bank.length, 0)} mots 
            dans {Object.keys(wordBanks).length} catégories
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomIdeaGenerator;