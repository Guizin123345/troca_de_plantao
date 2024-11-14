window.onload = function() {
    window.signaturePadSolicitante = new SignaturePad(document.getElementById('signature-pad-solicitante'));
    window.signaturePadSubstituto = new SignaturePad(document.getElementById('signature-pad-substituto'));
};

// Função para limpar a assinatura de um campo específico
function clearSignature(canvasId) {
    if (canvasId === 'signature-pad-solicitante') {
        window.signaturePadSolicitante.clear();
    } else if (canvasId === 'signature-pad-substituto') {
        window.signaturePadSubstituto.clear();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const signaturePadSolicitante = window.signaturePadSolicitante;
    const signaturePadSubstituto = window.signaturePadSubstituto;

})

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário para que possamos manipular os dados
    
    const { jsPDF } = window.jspdf;

    // Cria um novo documento PDF
    const pdf = new jsPDF();

    // Função para formatar a data no formato brasileiro (DD/MM/AAAA)
    function formatDate(date) {
    // Converte a data para o formato correto 'YYYY-MM-DD' para evitar problemas de fuso horário
    const [day, month, year] = date.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`);
    
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return formattedDate.toLocaleDateString('pt-BR', options);
}

    // Coleta os dados do formulário e formata as datas
    const nomeSolicitante = document.getElementById("nome_solicitante").value;
    const cpfSolicitante = document.getElementById("cpf_solicitante").value;
    const dataTroca = formatDate(document.getElementById("data_troca").value);
    const nomeSubstituto = document.getElementById("nome_substituto").value;
    const cpfSubstituto = document.getElementById("cpf_substituto").value;
    const nomeSolicitanteDestroca = document.getElementById("nome_solicitante_destroca").value;
    const cpfSolicitanteDestroca = document.getElementById("cpf_solicitante_destroca").value;
    const dataDestroca = formatDate(document.getElementById("data_destroca").value);
    const nomeSubstitutoDestroca = document.getElementById("nome_substituto_destroca").value;
    const cpfSubstitutoDestroca = document.getElementById("cpf_substituto_destroca").value;
    const dataSolicitacao = formatDate(document.getElementById("data_solicitacao").value);
    const plantao = document.getElementById("plantao").value;
    const dataTrocaPlantao = formatDate(document.getElementById("data_troca_plantao").value);
    const horaInicioTroca = document.getElementById("hora_inicio_troca").value;
    const horaTerminoTroca = document.getElementById("hora_termino_troca").value;
    const horaInicioDestroca = document.getElementById("hora_inicio_destroca").value;
    const horaTerminoDestroca = document.getElementById("hora_termino_destroca").value;

    // Configurações de centralização e layout do PDF
    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFontSize(14);
    pdf.text("Solicitação de Troca e Destroca de Plantão", pageWidth / 2, 10, { align: "center" });

    pdf.setFontSize(12);
    pdf.text("SOLICITAÇÃO DE TROCA DE PLANTÃO", pageWidth / 2, 20, { align: "center" });
    pdf.text(`Eu, ${nomeSolicitante}, portador(a) do CPF ${cpfSolicitante}, ` +
             `colaborador(a) desta empresa na função de Bombeiro Civil, ` +
             `venho através deste, pedir autorização para troca de plantão ` +
             `no dia ${dataTroca}. Este plantão será coberto por ` +
             `${nomeSubstituto}, portador(a) do CPF ${cpfSubstituto}.`, 10, 30, { maxWidth: 180 });

    pdf.text("SOLICITAÇÃO DE DESTROCA DE PLANTÃO", pageWidth / 2, 50, { align: "center" });
    pdf.text(`Eu, ${nomeSolicitanteDestroca}, portador(a) do CPF ${cpfSolicitanteDestroca}, ` +
             `colaborador(a) desta empresa na função de Bombeiro Civil, ` +
             `venho através deste, pedir autorização para destroca de plantão ` +
             `a ser realizada no dia ${dataDestroca}. Este plantão será coberto ` +
             `por ${nomeSubstitutoDestroca}, portador(a) do CPF ${cpfSubstitutoDestroca}.`, 10, 60, { maxWidth: 180 });

    pdf.text(`Data da solicitação: ${dataSolicitacao}`, 10, 80);

    pdf.text("PLANTÃO", pageWidth / 2, 90, { align: "center" });
    pdf.text(`Plantão: ${plantao}`, 10, 100);
    pdf.text(`Data da Troca: ${dataTrocaPlantao}`, 10, 110);
    pdf.text(`Hora Início: ${horaInicioTroca}`, 10, 120);
    pdf.text(`Hora Término: ${horaTerminoTroca}`, 10, 130);

    pdf.text("DESTROCA", pageWidth / 2, 140, { align: "center" });
    pdf.text(`Data da Destroca: ${dataDestroca}`, 10, 150);
    pdf.text(`Hora Início: ${horaInicioDestroca}`, 10, 160);
    pdf.text(`Hora Término: ${horaTerminoDestroca}`, 10, 170);

    // Assinatura do Solicitante
    const canvasSolicitante = document.getElementById("signature-pad-solicitante");
    const signatureSolicitante = canvasSolicitante.toDataURL("image/png");
    pdf.addImage(signatureSolicitante, "PNG", pageWidth / 2 - 25, 180, 50, 20);
    pdf.text("Assinatura do Solicitante", pageWidth / 2, 205, { align: "center" });

    // Assinatura do Substituto
    const canvasSubstituto = document.getElementById("signature-pad-substituto");
    const signatureSubstituto = canvasSubstituto.toDataURL("image/png");
    pdf.addImage(signatureSubstituto, "PNG", pageWidth / 2 - 25, 220, 50, 20);
    pdf.text("Assinatura do Substituto", pageWidth / 2, 245, { align: "center" });

    // Define o nome do PDF com base nos campos "nomeSolicitante" e "nomeSubstituto"
    const nomeArquivoPDF = `Troca_de_${nomeSolicitante}_com_${nomeSubstituto}.pdf`;

    // Gera o PDF com o nome dinâmico
    pdf.save(nomeArquivoPDF);
});

// Função para limpar a assinatura
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const signaturePad = new SignaturePad(canvas);
    signaturePad.clear();
}
