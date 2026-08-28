               </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{platform.label}</h4>
                      <p className="text-xs text-slate-400">{platformContent.length} items</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{platform.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {platform.formats.map((fmtId) => {
                    const fmt = getFormat(fmtId);
                    return fmt ? (
                      <span
                        key={fmtId}
                        className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600"
                      >
                        {fmt.label}
                      </span>
                    ) : null;
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{platformPublished} published</span>
                  <span className="text-slate-400">{platformContent.length - platformPublished} in progress</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pipeline Overview</h3>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2">
            {CONTENT_STAGES.map((stage, i) => {
              const count = MOCK_CONTENT.filter((c) => c.stage === stage.id).length;
              return (
                <div key={stage.id} className="flex items-center flex-1">
                  <div className="flex-1 text-center">
                    <div
                      className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-sm font-bold mb-2"
                      style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                    >
                      {count}
                    </div>
                    <p className="text-xs font-medium text-slate-600">{stage.label}</p>
                  </div>
                  {i < CONTENT_STAGES.length - 1 && (
                    <div className="h-0.5 flex-1 bg-slate-200 -mt-6" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
