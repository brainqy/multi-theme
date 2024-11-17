import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  downloadResume() {
    const element = document.body; // Replace with a specific div if needed
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgHeight = (canvas.height * 210) / canvas.width; // Maintain aspect ratio
      pdf.addImage(imgData, 'PNG', 0, 0, 210, imgHeight);
      pdf.save('resume.pdf');
    });
  }
}
