import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Commentaire } from 'src/app/model/commentaire';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService, ReponsesSubmite } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTooltipModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment: Commentaire;
  @Input() idComment: number;

  @Input() isReply = false;

  isReplying = false;
  replyText = '';
  showReactions = false;

  reactions = ['like', 'love', 'insightful', 'funny'];
  constructor(private commentService: CommentService,private authService:AuthService) {}

  toggleReply() {
    if (!this.isReply) {
      this.isReplying = !this.isReplying;
    }
  }

  addReply() {
    if (this.replyText.trim()) {
      const reponse: ReponsesSubmite = {
        texte: this.replyText,
        commentaireId: this.idComment, // Use the input property here
        idChef: this.authService.getCurrentUser().person.id
      };

      this.commentService.addReponseToCommentaire(reponse).subscribe(
        (response) => {
          console.log('Réponse ajoutée avec succès', response);
          this.replyText = '';
          this.isReplying = false;
          // Optionally, you can update the local comments array to show the new reply immediately
          if (!this.comment.responses) {
            this.comment.responses = [];
          }
          this.comment.responses.push(response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la réponse', error);
        }
      );
    }
  }

  toggleReactions() {
    this.showReactions = !this.showReactions;
  }

  setReaction(reaction: string) {
    this.showReactions = false;
  }

  getReactionIcon(reaction: string): string {
    switch (reaction) {
      case 'like':
        return 'thumb_up';
      case 'love':
        return 'favorite';
      case 'insightful':
        return 'lightbulb';
      case 'funny':
        return 'sentiment_very_satisfied';
      default:
        return 'add_reaction';
    }
  }
}
