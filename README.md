# BANDEC, site institucional

Site do BANDEC, Banco Nacional de Desenvolvimento Empreendedor e Crédito,
uma Organização da Sociedade Civil de Interesse Público (OSCIP) qualificada
pelo Ministério da Justiça e sediada em Curitiba.

Uma página só, estática, sem framework e sem build: três arquivos HTML, uma
folha de estilo e um script de 40 linhas. Abre em qualquer servidor de arquivos
e fica nítido em qualquer tela, porque tudo que não é foto é vetor ou fonte.

## O que tem

- **Abertura** com a qualificação da OSCIP e os dois caminhos do visitante:
  conhecer as soluções ou propor parceria.
- **Quem somos**, com os quatro pilares da instituição.
- **Soluções**, as seis frentes de atuação: crédito e fomento, conta digital e
  pagamentos, fundos e garantias, consultoria e capacitação, projetos e
  concessões, mercado financeiro e negócios.
- **Para quem**: os oito perfis atendidos, da pessoa física ao poder público.
- **Diferenciais**, **Investimento e parceria** e **Contato**, com formulário
  que monta a mensagem e abre o programa de e-mail do visitante.
- Páginas de Termos de Uso e Política de Privacidade.

## Identidade

| Papel | Cor |
| --- | --- |
| Fundo escuro e texto no claro | `#0b0b0c` |
| Cartões sobre o escuro | `#141416` |
| Destaque (botão principal, ícones, bolinha da logo) | `#e04000`, `#ff6a2b` sobre o escuro |
| Cinzas da logo | `#bdbdbd` e `#7a7a7e` |
| Fundo claro | `#f4f2ef` |

Tipografia: Sora nos títulos e Source Sans 3 no texto, via Google Fonts.
Ícones em SVG inline, no traço do Lucide. Uma cor de destaque só, e as três
cores das bolinhas da logo nunca mudam, em fundo claro ou escuro.

## Estrutura

```
index.html
politica-de-privacidade.html
termos-de-uso.html
assets/
  styles.css      tokens, componentes e três pontos de quebra (1100, 980, 720)
  main.js         menu do celular, entrada suave das seções, formulário por e-mail
  img/            logo em preto e em branco, favicon e fotos
```

## Rodar localmente

```bash
python3 -m http.server 5190
```

e abrir http://localhost:5190.

## Publicar

O site é servido por um bucket S3 privado atrás de uma distribuição CloudFront.
Qualquer hospedagem de arquivos estáticos serve igual (GitHub Pages, Netlify,
Vercel): é só copiar os arquivos.

```bash
aws s3 sync . s3://<bucket>/ --delete --exclude ".git/*" --exclude ".claude/*" --exclude "README.md" --exclude "LICENSE"
aws s3 cp politica-de-privacidade.html s3://<bucket>/politica-de-privacidade --content-type "text/html; charset=utf-8"
aws s3 cp termos-de-uso.html s3://<bucket>/termos-de-uso --content-type "text/html; charset=utf-8"
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

As duas cópias sem extensão existem porque os links do site são
`/termos-de-uso` e `/politica-de-privacidade`.

## Licença

O código (HTML, CSS e JavaScript) está sob a licença MIT. A marca BANDEC, os
textos institucionais e as fotos pertencem ao BANDEC e não estão cobertos pela
licença.
