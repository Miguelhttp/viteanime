import { useState } from "react";
import { MessageSquare, X, Send, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    // Configuração para envio de email via mailto:
    const baseEmail = "migueldevsfront@gmail.com"; // Substitua pelo seu email real caso seja diferente
    const subject = encodeURIComponent("Novo Feedback - ViteAnime");
    const body = encodeURIComponent(
      `Avaliação: ${rating} Estrela(s)\n\nComentários ou Sugestões:\n${comment || "Nenhum comentário adicionado."}`,
    );

    // Abre o cliente de email padrão do usuário com as informações preenchidas
    window.location.href = `mailto:${baseEmail}?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setRating(0);
      setComment("");
    }, 3000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: !isOpen ? 1 : 0, opacity: !isOpen ? 1 : 0 }}
        aria-label="Deixe seu feedback"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-6 bottom-6 z-50 w-[340px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/50 p-4">
              <h3 className="font-semibold text-white">Deixe seu feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-white">
                    Obrigado!
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Seu feedback nos ajuda a melhorar a plataforma.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <p className="mb-2 text-sm text-zinc-300">
                      Como você avalia nosso sistema?
                    </p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-7 w-7 transition-colors ${
                              star <= (hoveredRating || rating)
                                ? "fill-yellow-500 text-yellow-500"
                                : "fill-zinc-800 text-zinc-600 hover:text-zinc-500"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="comment"
                      className="mb-1 block text-sm text-zinc-300"
                    >
                      Comentários ou Sugestões (opcional)
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="O que pode ser melhorado?"
                      className="h-24 w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={rating === 0}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>Enviar Feedback</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
