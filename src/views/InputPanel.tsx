                 </div>
                ) : (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all focus:bg-white focus:border-sky-300 focus:ring-2 focus:ring-sky-100 placeholder:text-slate-400"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {sampleItem && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Sample Input</h3>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
                style={{
                  backgroundColor: `${getPlatform(sampleItem.platform)?.color}18`,
                  color: getPlatform(sampleItem.platform)?.color,
                }}
              >
                {getPlatform(sampleItem.platform)?.label[0]}
              </span>
              <span className="text-sm font-medium text-slate-700">{sampleItem.title}</span>
              <span className="text-xs text-slate-400">
                · {getFormat(sampleItem.format)?.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INPUT_FIELDS.map((field) => {
                const value = sampleItem.input[field.key];
                if (!value) return null;
                return (
                  <div key={field.key} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                      {field.label}
                    </p>
                    <p className="text-sm text-slate-700">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-sky-50 border border-sky-100 rounded-xl">
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold">Reusability:</span> Every platform reads from this same
          input schema. Platform-specific logic can extend these fields without breaking the shared
          structure.
        </p>
      </div>
    </div>
  );
}
