import { Component, OnInit } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { CommentService } from 'src/app/services/commentaire.service';
import { ActivatedRoute } from '@angular/router';
import { Commentaire } from 'src/app/model/commentaire';
import { Tache } from 'src/app/model/tache';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommentComponent, CommonModule, NgFor,DatePipe],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.scss'
})
export class CommentsSectionComponent implements OnInit {
  comments: Commentaire[];
  tacheId!: string;
  tache: Tache;
  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private tacheService: TacheService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de tâche depuis l'URL
    this.route.params.subscribe((params) => {
      const tacheId = params['id'];
      if (tacheId) {
        this.loadComments(tacheId);
        this.loadTache(tacheId);
      }
    });
  }
  loadTache(tacheId: string) {
    this.tacheService.getTacheById(tacheId).subscribe(
      (data) => {
        this.tache = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de tache', error);
      }
    );
  }

  loadComments(tacheId: string): void {
    this.commentService.getComments(tacheId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des commentaires', error);
      }
    );
  }
}
