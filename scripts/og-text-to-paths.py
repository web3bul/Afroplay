import re,sys,html
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
B='/tmp/claude-0/-home-claude/c7c208f2-dcab-58fc-a607-0b4364b1c7c4/scratchpad/ogtool/node_modules/@fontsource/'
F={'heading':B+'russo-one/files/russo-one-latin-400-normal.woff','reg':B+'outfit/files/outfit-latin-400-normal.woff','bold':B+'outfit/files/outfit-latin-700-normal.woff'}
fonts={k:TTFont(v) for k,v in F.items()}
def pick(fam,weight):
    if 'Black' in fam or (weight and int(weight)>=800): return 'heading'
    if weight and int(weight)>=600: return 'bold'
    return 'reg'
def conv(m):
    a=m.group(1); txt=html.unescape(m.group(2))
    g=lambda k,d=None:(re.search(r'\b'+k+r'="([^"]*)"',a) or [None,d])[1]
    x=float(g('x',0));y=float(g('y',0));fs=float(g('font-size',16));fill=g('fill','#fff');ls=float(g('letter-spacing',0));w=g('font-weight');fam=g('font-family','')
    op=g('fill-opacity');anchor=g('text-anchor','start')
    f=fonts[pick(fam,w)];gs=f.getGlyphSet();cmap=f.getBestCmap();upm=f['head'].unitsPerEm;sc=fs/upm
    adv=0;items=[]
    for ch in txt:
        gn=cmap.get(ord(ch))
        if gn is None: gn=cmap.get(ord('?'))
        items.append((gn,adv)); adv+=gs[gn].width*sc+ls
    adv-=ls
    ox=x-(adv/2 if anchor=='middle' else adv if anchor=='end' else 0)
    d=''
    for gn,ax in items:
        pen=SVGPathPen(gs,ntos=lambda v:('%.2f'%v).rstrip('0').rstrip('.'))
        tp=TransformPen(pen,(sc,0,0,-sc,ox+ax,y))
        gs[gn].draw(tp); d+=pen.getCommands()
    return f'<path d="{d}" fill="{fill}"'+(f' fill-opacity="{op}"' if op else '')+'/>'
for p in sys.argv[2:]:
    s=open(p).read()
    s=re.sub(r'<text\b([^>]*)>(.*?)</text>',conv,s,flags=re.S)
    open(p.replace('.svg','.paths.svg') if sys.argv[1]=='x' else p,'w').write(s)
